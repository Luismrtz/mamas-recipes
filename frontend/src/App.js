import React from "react";
import {Route} from 'react-router-dom';
import './App.module.css';
import { MainPage, ShowRecipe, AllRecipes, NewRecipe} from './components/index';



export default function App() {
    return (
        <div >
         <Route exact path="/" component={MainPage}/>
         <Route path="/showrecipe/:id" component={ShowRecipe}/>
         <Route path="/showall" component={AllRecipes}/>
         <Route path="/new" component={NewRecipe}/>
          
            
        </div>
    )
}