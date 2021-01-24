import express from 'express';
import config from './config';
// import dotenv from 'dotenv';
import mongoose from 'mongoose';
// import userRoute from './routes/userRoute';
import bodyParser from 'body-parser';
import recipeRoute from './routes/recipeRoute';
import userRoute from './routes/userRoute';
import uploadRoute from './routes/uploadRoute';
import "regenerator-runtime/runtime.js";

const app = express();
const path = require('path');
// dotenv.config();
app.use(bodyParser.json());



const port = config.SERVER_PORT;

const cors = require("cors");
app.use(cors());


const uri = config.MONGO_URI;

mongoose.connect( uri, {
    useUnifiedTopology: true,
    useNewUrlParser:true,
    useFindAndModify: false,
    useCreateIndex: true

})
.then(() => { console.log("MongoDB Connection established successfully")
})
.catch(error => console.log(error.reason));





app.use('/recipes', recipeRoute);
app.use('/users', userRoute);
app.use('/uploads', uploadRoute);
// app.use('/users', userRoute);
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/../frontend/build/index.html'));
});


app.listen(port, () => {console.log(`Server started at ${port}`)});
