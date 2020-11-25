import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { bannerProduct} from '../../actions/bannerActions';
import { listRecipes, filterRecipes} from '../../actions/recipeActions';
import {useLocation} from 'react-router-dom'

import Searchbar from '../searchbar/SearchBar'


const Search = (props) => {
const {search} = useLocation();


const rList = useSelector(state => state.rList);
const {recipes, loading, error } = rList;

const recipeFilter = useSelector(state => state.recipeFilter);
const {rec, loading: rLoading, error: rError} = recipeFilter;


const searchParams = new URLSearchParams(search);

const q = searchParams.get('q')

// if(!rec) {
//     props.history.push('/');
// } 
// if(rError) {
         
//     props.history.push('/');   
// }




const dispatch = useDispatch();
    console.log(recipes)
console.log(props.location.pathname)
    useEffect(() => {
        if(q === null) {
            props.history.push('/')
        }
        
        
         dispatch(filterRecipes(q));    

        return () => {
           //
        }
      }, [dispatch, q, props.history])
      console.log(rec && rec);

    return  (
        <div>
<Searchbar props={props}/>


          <h1>name: {q}</h1>  
          <h3>{rec && rec.map(recipe => {
               return  <div key={recipe._id} style={{marginTop:"50px"}}>
                     <div>
                     {recipe.nameOfRecipe}
                   </div>
                   <div style={{marginBottom:"50px"}}>
                     <p>{recipe.description}</p>
                   </div>
                   <div style={{marginLeft:"150px", whiteSpace:"pre-wrap"}}>
                    <p>{recipe.ingredients}</p> 
                   </div>
                   <div style={{marginLeft:"250px", whiteSpace:"pre-wrap"}}>
                     <p>{recipe.instructions}</p>
                   </div>
                 </div>
          })}</h3>
        </div>
    )
}

export default Search
