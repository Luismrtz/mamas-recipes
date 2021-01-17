import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Search.module.scss';

import { listRecipes, filterRecipes} from '../../actions/recipeActions';
import {useLocation} from 'react-router-dom'
import {Link} from 'react-router-dom';

import Searchbar from '../searchbar/SearchBar'
import Footer from '../footer/Footer';
import RecipeItem from '../recipeitem/RecipeItem';
import cx from 'classnames';

const Search = (props) => {
const {search} = useLocation();


const rList = useSelector(state => state.rList);
const {recipes, loading, error } = rList;

const recipeFilter = useSelector(state => state.recipeFilter);
const {rec, loading: rLoading, error: rError} = recipeFilter;


const searchParams = new URLSearchParams(search);

const q = searchParams.get('q')




const dispatch = useDispatch();
console.log(q)
    console.log(recipes)
    console.log(rec.message)
    console.log(rError)
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





    return  error  ? <div>{error}</div> :  (
<div className={styles.mainContainer}>

<div className={styles.titleContainer}>

        <div className={styles.searchContainer}>

            <Searchbar />
        </div>
      <h1 className={cx(styles.title, styles.center)}>{q}</h1>


  </div>

      
      
     <div className={ styles.itemsContainer }> 
    
  
   

          <div className={styles.grid}>
              {rec && rec.map(recipe => {
                 
                  return (
                      <RecipeItem  key={recipe._id} recipe={recipe} />
                      ) 
                  
              })}
          </div>

          

              
    </div>

<Footer/>
</div>


    )
}

export default Search
