import express from 'express';
import Recipe from '../models/recipeModel';

const router = express.Router();

router.post("/add", async(req, res) => {
    
    try {

        // if (req.body.dish == false && req.body.dessert== false && req.body.beverage === false ) {
        //     return res.status(400).send({message: "Please checkmark at least one! :)"})
        // }

        const newRecipe = new Recipe({
            nameOfRecipe: req.body.nameOfRecipe,
            description: req.body.description,
            ingredients: req.body.ingredients,
            instructions: req.body.instructions,
            dessert: req.body.dessert,
            beverage: req.body.beverage,
            dish: req.body.dish
        });
        const newRecipeCreated = await newRecipe.save();
        res.status(201).send({ message: "New Recipe Created", recipe: newRecipeCreated });
    } catch (err) {
        res.json({ message: err})
    }
})

router.get("/", async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.json(recipes);

    } catch (error) {
        res.json({message: error.message})
    }
});

router.get("/show:id", async (req, res) => {
    try {
        const recipes = await Recipe.findOne({_id: req.params.id});
        res.json(recipes);

    } catch (error) {
        res.status(404).send({message: "Product Not Found."})
    }
});


router.get("/filter", async (req, res) => {
    try {
        let q = req.query.q;
      //  let poopers = JSON.stringify(poop)
      //  console.log(poopers)
        const someRecipes = await Recipe.find({ $text: {$search: q }});
        res.json(someRecipes);
      //  console.log(someRecipes)
    } catch (error) {
        res.json({message: error.message})
    }
});



// router.delete("/",  async (req, res) => {
//     try {
//         const deleteAll = await Recipe.remove();
//         res.send(deleteAll);
//     } catch(error) {
//         res.status(404).send("product NOt fpoundsa");
//     }
//   });


  router.delete("/:id",  async (req, res) => {
    const recipe = await Recipe.findOne({ _id: req.params.id });
    if (recipe) {
      const deletedRecipe = await recipe.remove();
      res.send(deletedRecipe);
    } else {
      res.status(404).send("Recipe Not Found.")
    }
  });



  //*UPDATE
router.patch('/update/:id', async(req,res) => {
    try {
        const recipe = await Recipe.updateOne(
            {_id: req.params.id},
           {$set: req.body}
        )
        res.json(recipe);
    } catch (err) {
        res.json({ message: 'Error in updating Product.' })
    }

});

export default router;