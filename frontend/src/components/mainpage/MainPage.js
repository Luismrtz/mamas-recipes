import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './MainPage.module.css';
// import {Link} from 'react-router-dom';
// import Banner from '../Banner/Banner';
// import Loading from '../spinner/Loading'
// import MainSales from '../mainPageSales/MainSales';
// import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { useSelector, useDispatch } from 'react-redux';
// import { bannerProduct} from '../../actions/bannerActions';
import { listRecipes} from '../../actions/recipeActions';
// import Footer from '../Footer/Footer';


const MainPage = () => {


//*let value = useContext(ProductContext);  every products had value.products/currentPosts, originally. But can just destructure
// let {products, isGlobalSpinnerOn} = useContext(ProductContext);

// const pList = useSelector(state => state.pList);
// const bList = useSelector(state => state.bList);
// const { products, loading, error } = pList;
// const { banners} = bList;
// const dispatch = useDispatch();

// useEffect(() => {
//     dispatch(listProducts());
//     dispatch(bannerProduct());
//     return () => {
//        //
//     }
// }, [dispatch])

const rList = useSelector(state => state.rList);
const {recipes, loading, error } = rList;


const dispatch = useDispatch();


useEffect(() => {
  dispatch(listRecipes());
  return () => {
     //
  }
}, [dispatch])













const unitsLong = ['tablespoons','ounces','tsp','cups','pounds'];
const unitsShort = ['tbsp','oz','tsp','cup','pound'];
//unitShort doesnt includ grams or kilograms, so we doing a seperate
// const units = [...unitsShort, 'kg','g'] //destructuring: instead of having an array inside of an array, it will take these elements from unitShort and put them here


// const newIngredients = recipes && recipes.map(recInst => {
//   const newIng = recIng.ingredients.map(ingredient => {
//     let newType = ingredient.type.toLowerCase(); 
//    if (ingredient.quantity <= 1) {
//     unitsLong.forEach((unit,i) => {
//      newType = newType.replace(unit, unitsShort[i]);
//     //  newType = newType.replace(/ *\([^)]*\) */g, ' ');
//     }); 
//    } 
   
//   }

// })





console.log(recipes)
console.log(recipes && recipes[0])
    // return loading ? <div><Loading/></div> :
    // error || !banners ? <ErrorMsg variant="danger">{error}</ErrorMsg> :
    return (

      <React.Fragment>
          <div className={styles.color}>MainPage</div>
          <Link to={"/showall"} className={styles.btn}>
            <button>SHOW ALL</button>
          </Link>
          <Link to={"/new"} className={styles.btn}>
            <button>Create Recipe</button>
          </Link>
      {recipes && recipes.map((recipe) => (
        <div key={recipe._id} style={{marginTop:"50px"}}>
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


      ))

      }
     
      </React.Fragment>
    )
}

export default MainPage;