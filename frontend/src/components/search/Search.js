import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Search.module.scss';
// import { bannerProduct} from '../../actions/bannerActions';
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

// if(!rec) {
//     props.history.push('/');
// } 
// if(rError) {
         
//     props.history.push('/');   
// }




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


        <Searchbar />
      <h1 className={cx(styles.title, styles.center)}>name: {q}</h1>


  </div>

      
      
     <div className={ styles.itemsContainer }> 
    
  
    {/* <div className={styles.flex}>
          <div className={styles.numPerPageGrid}>
            {onePage === 1 ? <div className={styles.textPerPage}>Showing all {(filter === null ? (defNew) : (filter)).length} results</div> 
                      :
              <div className={styles.textPerPage}>Showing {indexOfFirstPost + 1}-{indexOfFirstPost + currentPosts.length} of {(filter === null ? (defNew) : (filter)).length} results</div>
              }
              <div className={styles.numPerPageWrap}>
                  <div className={styles.showBtn}>show</div>
                  <button className={fivePage ? cx(styles.numPerPage, styles.borderLine) : styles.numPerPage} onClick={() => five()}>5</button>
                  <button className={tenPage ?cx(styles.numPerPage, styles.borderLine) : styles.numPerPage} onClick={() => ten()}>10</button>
                  <button className={fifPage ? cx(styles.numPerPage, styles.borderLine) : styles.numPerPage} onClick={() => fifteen()}>15</button>    
              </div>
          </div>
              

      <div className={styles.icons}>
          <div onClick={() => setToggled(true)}><Grid alt="grid" className={styles.svg1}/></div>
        
          <div onClick={() => setToggled(false)}><List alt="list" className={styles.svg2}/></div>
      </div>

    </div> */}
   

          <div className={styles.grid}>
              {rec && rec.map(recipe => {
                 
                  return (
                      <RecipeItem  key={recipe._id} recipe={recipe} />
                      ) 
                  
              })}
          </div>

          {/* <nav className={styles.navPagination}>
               <Pagination  postsPerPage={postsPerPage} totalPosts={ (filter === null ? (defNew) : (filter)).length} paginate={paginate}/>
          </nav> */}
          

              
    </div>

<Footer/>
</div>


    )
}

export default Search
