

import express from 'express';
import User from '../models/userModel';
import bcrypt from 'bcryptjs';
import {getToken, isAuth, isAdmin} from '../util'
const router = express.Router();





//?get Specific post
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        res.json(user)
    } catch (error) {
        res.json({message: error});
    }
});

// //? get ALL post * (isAuth, isAdmin) ADD LATER 
router.get("/",  async (req, res) => {
    // User.find() for promise version?
    try {
        const user = await User.find({});
        res.json(user);

    } catch (error) {
        res.json({message: error.message})
    }
});


//? .then.catch apprach
// router.get('/', (req, res) => {
//     User.find()
//     .then(users => res.json(users))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.post('/add', (req,res) => {
//      const name = req.body.name;
//     const email = req.body.email;
//     const password = req.body.password;
//     const isAdmin = req.body.isAdmin;

//     const newUser = new User({name,
//        email,password, isAdmin
//     });

//     newUser.save()
//     .then(() => res.json('User added!'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });


// //? try catch approach
router.get("/createadmin", async (req, res) => {
    // User.find() for promise version?
    try {
        const newUser = await User.find();
        res.json(newUser);

    } catch (error) {
        res.json({message: error.message})
    }
});

//? 
//* post signin

router.post('/signin', async(req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).send({message: "Not all fields have been entered"})
        }

        const signinUser = await User.findOne({
            email,
           // password: req.body.password //comment out when bcrypt
        });
        if (!signinUser) {
            return res.status(400).send({message: "No account with this email has been registered."});
        }
        const isMatch = bcrypt.compareSync(password, signinUser.password)
        if(!isMatch) {
            return res.status(400).send({message: "Invalid credentials."})
        }

        if(signinUser) {
            if(isMatch) {
            res.json({
                _id: signinUser.id,
                name: signinUser.name,
                email: signinUser.email,
                isAdmin: signinUser.isAdmin,
                token: getToken(signinUser)
            });
           return;
         }
        }

    } catch(error) {
        res.status(401).send({error: error.message});
    }
});


// const user = await User.updateOne(
//     {_id: req.params.id},
//   // {$set: req.body}
//   { name: req.body.name,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
// }
// )


//* update user profile
router.put('/:id', isAuth, async(req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
       // console.log(req.body.newPassword)
       const isMatch = bcrypt.compareSync(req.body.password, user.password)
     //   if (user) {
        if(!isMatch) {
            return res.status(400).send({message: "Invalid credentials."})
        }
         if (req.body.newPassword && req.body.newPassword.length < 5) {
             return res.status(400).send({message: "The password needs to be at least 5 characters long."})
         }
            if (isMatch) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
             if(req.body.newPassword) {
                user.password = bcrypt.hashSync(req.body.newPassword, 8);
             }
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                token: getToken(updatedUser),
            });
        }
        return;
    //    }
    } catch(error) {
        res.status(404).send({message: 'User Not Found'});
    }
});




///! Just to push an admin
//router.post(... in insomnia
router.post("/createadmin", async(req, res) => {
    try {
        const user = new User({
            name: 'mama',
            email: 'mama@gmail.com',
            password: bcrypt.hashSync('mamamom', 8),
            isAdmin: true
        });
        const newUser = await user.save();
        res.json(newUser);
    } catch(error) {
        res.json({message: error.message})
    }
})





//? REGISTER: push to db 
router.post('/register', async (req, res) => {
    const {email, password, rePassword, name} = req.body;
    try {

        if (!email || !password || !rePassword || !name) {
            return res.status(400).send({message: "Not all fields have been entered."})
        }
        if (password.length < 5) {
            return res.status(400).send({message: "The password needs to be at least 5 characters long."})
        }
        if (password !== rePassword) {
            return res.status(400).send({message: "Password does not match."})
        }



        const existingUser = await User.findOne({email: email});
        if(existingUser) {
            return res.status(400).send({message: "An account with this email already exists."});
        }

        const user = new User({
            name,
            email,
            password: bcrypt.hashSync(req.body.password, 8),
            });


        const newUser = await user.save();
        if (newUser) {
        res.json({
            _id: newUser.id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: getToken(newUser),
        });
        }
    }catch(error)  {
      res.status(401).send({message: 'Invalid User Data.' });
    }
  });








// router.get("/:id", async (req, res) => {
//     try {
//  const product = await User.findOne({_id: req.params.id});
//         res.json(product);

//     }
//    catch (error) {
//             res.status(404).send({message: "Product Not Found."})
//         }
//     });




//? submits a post
router.post("/add", async(req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    try {
    const user = new User({
        name,
        email,
        password,
        isAdmin
    });
   
        const saveUser = await user.save();
        res.json(saveUser);
    } catch (error) {
        res.json({message: error})
    }
});




 //delete specific post
router.delete('/:id', async (req, res) => {
    try {
       const remove = await User.findByIdAndDelete(req.params.id)
        
        res.json({remove})
    } catch(error) {
        res.json({message: error})
    }
});


// router.post('/update/:id', async(req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         user.name = req.body.name;
//         user.email = req.body.email;
//         user.password = req.body.password;
//         user.isAdmin = req.body.isAdmin;
        
//         const saveUser = await user.save();
//         res.json(saveUser);
//     } catch (error) {
//         res.json({message: error});
//     }
// })



//? update revised
router.patch('/update/:id', isAuth, async(req,res) => {
    try {
        const user = await User.updateOne(
            {_id: req.params.id},
           {$set: req.body}
        )
        res.json(user);
    } catch (err) {
        res.json({ message: err})
    }

});








export default router;