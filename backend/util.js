import jwt from 'jsonwebtoken';
import config from './config';
const getToken = (user) => {
    return jwt.sign({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,

    }, config.JWT_SECRET, 
    // {
    //     expiresIn: '60h'
    // }
    )
}


const isAuth = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; 
    // Express headers are auto converted to lowercase
    //todo causing ' cannot read property 'startsWith' of undefined'
    if (token.startsWith('Bearer ')) {
      // Remove Bearer from string
      token = token.slice(7, token.length).trimLeft();
    }
    if (token) {
    
    jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid'
        });
      } else {
        req.user = decoded;
        next();
      }
    });
    } else {
    
        return res.status(401).send({message: 'Token is not supplied.'})
    }
    }






const isAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin) {
        return next();
    }
    return res.status(401).send({message: 'Admin Token is not valid.'})
}
export {
    getToken, isAuth, isAdmin
}