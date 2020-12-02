import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { detailsRecipe } from '../../actions/recipeActions';
import styles from './ShowRecipe.module.css';
// import {Link} from 'react-router-dom';
// import Banner from '../Banner/Banner';
// import Loading from '../spinner/Loading'
// import MainSales from '../mainPageSales/MainSales';
// import ErrorMsg from '../ErrorMsg/ErrorMsg';
// import { useSelector, useDispatch } from 'react-redux';
// import { bannerProduct} from '../../actions/bannerActions';
// import { listProducts} from '../../actions/productActions';
// import Footer from '../Footer/Footer';


const ShowRecipe = (props) => {
  const dispatch = useDispatch();
  const rDetails = useSelector((state) => state.rDetails);
  const { recipe, loading, error } = rDetails;

  const productId = props.match.params.id;



  useEffect(() => {
    dispatch(detailsRecipe(productId))
    return () => {
      
    }
  }, [dispatch, productId])


  console.log(recipe)
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




    // return loading ? <div><Loading/></div> :
    // error || !banners ? <ErrorMsg variant="danger">{error}</ErrorMsg> :
    return (

      <React.Fragment>
          <div className={styles.color} style={{ whiteSpace:"pre-wrap"}}>{recipe && recipe.nameOfRecipe}</div>
          <div className={styles.color} style={{marginLeft:"150px", whiteSpace:"pre-wrap"}}>{recipe && recipe.description}</div>
          <div className={styles.color} style={{marginLeft:"150px", whiteSpace:"pre-wrap"}}>{recipe && recipe.ingredients}</div>
          <div className={styles.color} style={{marginLeft:"150px", whiteSpace:"pre-wrap"}}>{recipe && recipe.instructions}</div>

      </React.Fragment>
    )
}

export default ShowRecipe;