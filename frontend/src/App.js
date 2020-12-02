import React from "react";
import {Route} from 'react-router-dom';
import './App.module.css';
import AdminRoute from "./components/adminRoute/AdminRoute";
import { MainPage, ShowRecipe, AllRecipes, NewRecipe, Search, Signin, Register, Profile} from './components/index';



export default function App() {
    return (
        <div >
         <Route exact path="/" component={MainPage}/>
         <Route path="/signin" component={Signin} />
         <Route path="/register" component={Register} />
         <Route path="/profile" component={Profile} />
         <Route path="/showrecipe/:id" component={ShowRecipe}/>
         <Route path="/showall" component={AllRecipes}/>
         <AdminRoute path="/new" component={NewRecipe}/>
         <Route path="/search" component={Search}/>
          
            
        </div>
    )
}