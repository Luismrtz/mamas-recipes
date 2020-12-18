import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { detailsRecipe } from '../../actions/recipeActions';
import styles from './ShowRecipe.module.scss';
// import {Link} from 'react-router-dom';
// import Banner from '../Banner/Banner';
// import Loading from '../spinner/Loading'
// import MainSales from '../mainPageSales/MainSales';
// import ErrorMsg from '../ErrorMsg/ErrorMsg';
// import { useSelector, useDispatch } from 'react-redux';
// import { bannerProduct} from '../../actions/bannerActions';
// import { listProducts} from '../../actions/productActions';
// import Footer from '../Footer/Footer';


const useViewport = () => {
  const [width, setWidth] = React.useState(window.innerWidth);
  // const [poop] = React.useState(true);
  React.useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // Return the width so we can use it in our components
  return { width };
}



const ShowRecipe = (props) => {
  const dispatch = useDispatch();
  const rDetails = useSelector((state) => state.rDetails);
  const { recipe, loading, error } = rDetails;
  const { width } = useViewport();
  const breakpoint = 768;
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

      <div className={styles.spacing}>

<h1 className={styles.recTitle}>{recipe && recipe.nameOfRecipe}</h1>
<div style={{display:'flex', marginTop:'2rem'}}>
<h4>pic|| </h4>
<h4>Mama|| </h4>
<h4>{recipe && recipe.beverage ? 'beverage' : ''}|| </h4>
<h4>{recipe && recipe.dessert ? 'dessert' : ''}|| </h4>
<h4>{recipe && recipe.dish ? 'dish' : ''}|| </h4>
<h4>5 stars</h4>
</div>

  <div className={styles.lineTitle}>
                <div className={styles.divLine}></div>
                {/* <div className={styles.title}>
                     NEW & SPECIALS
                </div> */}
                {/* <div className={styles.divLine}></div> */}
  </div>
<div className={styles.recDesc}>{recipe && recipe.description}</div>
<div className={styles.slider}>
          <div className={styles.slide}>
          <div className={styles.bContainer}>
                <img src={width < breakpoint ? '/images/bannerLarge1.jpg' : '/images/bannerLarge2.jpg'} alt="slider-img"  className={styles.imgStyles}></img>
               {/* <div className={styles.bannerTitle}>
                    <h3>Do you like cooking?</h3>
                    <h1>Mama's got you covered</h1>
                    <BannerSearch />
               </div> */}
                
                {/* <Link to={`${link}`} className={styles.block}>
                    <div className={styles.innerBlock}>
                        <div  className={styles.bannerText}>{info}</div>
                    </div>
                </Link> */}
            </div>


            </div>
        </div>

          <h1>Ingredients</h1>
          <div>

          {recipe && recipe.ingredients.map((ingredient) => (

<div key={ingredient._id}  className={styles.divy} >
              
              <input type="checkbox"  

                      id={ingredient._id}  
                      name="strike" 
                
                      // value={isDessert || ''} 
                      // onChange={(e) => setIsDessert(!isDessert)}
                      />
         
          
              {/* <span htmlFor={ingredient._id}></span> */}
                        <label htmlFor={ingredient._id}>
                               {ingredient.ingredient}
                          </label>
</div>

         
               
                    ))}
          </div>
          <h1>Instructions</h1>
          <ol className={styles.color} >
          {recipe && recipe.instructions.map((step) => (
                        <li key={step._id}>
                          <p>{step.step}</p>
                        </li>
                    ))}
          </ol>

      </div>
    )
}

export default ShowRecipe;