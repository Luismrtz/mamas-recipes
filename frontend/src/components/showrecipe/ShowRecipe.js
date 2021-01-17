import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { detailsRecipe } from '../../actions/recipeActions';
import styles from './ShowRecipe.module.scss';
import cx from 'classnames';
// import {Link} from 'react-router-dom';
// import Banner from '../Banner/Banner';
// import Loading from '../spinner/Loading'
// import MainSales from '../mainPageSales/MainSales';
// import ErrorMsg from '../ErrorMsg/ErrorMsg';
// import { useSelector, useDispatch } from 'react-redux';
// import { bannerProduct} from '../../actions/bannerActions';
// import { listProducts} from '../../actions/productActions';
import Footer from '../footer/Footer';


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






    // return loading ? <div><Loading/></div> :
    // error || !banners ? <ErrorMsg variant="danger">{error}</ErrorMsg> :
    return (
      <div>
   <div className={styles.spacing}>

<h1 className={styles.recTitle}>{recipe && recipe.nameOfRecipe}</h1>
<div className={styles.infoWrap} >
  <div  className={styles.flex} >
    <div className={styles.momPic}>
          <img className={styles.image} src='/images/bannerLarge1.jpg' alt="mom"/>
      </div>
      <h4 className={styles.author}>Mama</h4>
      <div className={styles.recipeType}>
        <div className={cx(styles.iconFlex, (recipe && recipe.beverage) && "fa fa-coffee" )} aria-hidden="true"><h4 className={styles.iconGap}>{recipe && recipe.beverage ? 'beverage' : ''}</h4></div>
        <div className={cx(styles.iconFlex, (recipe && recipe.dessert) && "fa fa-birthday-cake" )} aria-hidden="true"><h4 className={styles.iconGap}>{recipe && recipe.dessert ? 'dessert' : ''}</h4></div>
        <div className={cx(styles.iconFlex, (recipe && recipe.dish) && "fa fa-cutlery" )} aria-hidden="true"><h4 className={styles.iconGap}>{recipe && recipe.dish ? 'dish' : ''}</h4></div>
      </div>

      <div className={styles.commentCount}>
        <div className="fa fa-comment-o" aria-hidden="true"></div>
        <div className={styles.comNum}>0</div>
      </div>

  </div>

    <ul>
      <li className="fa fa-star" aria-hidden="true" ></li>
      <li className="fa fa-star" aria-hidden="true" ></li>
      <li className="fa fa-star" aria-hidden="true" ></li>
      <li className="fa fa-star" aria-hidden="true" ></li>
      <li className="fa fa-star" aria-hidden="true" ></li>

    </ul>
</div>

  <div className={styles.lineTitle}>
                <div className={styles.divLine}></div>
   
  </div>
<div className={styles.recipeDesc}>{recipe && recipe.description}</div>
<div className={styles.slider}>
          <div className={styles.slide}>
          <div className={styles.bContainer}>
                <img src={width < breakpoint ? '/images/bannerLarge1.jpg' : '/images/bannerLarge2.jpg'} alt="slider-img"  className={styles.imgStyles}></img>

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
         
                      />
         
          
           
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
          <Footer/>
      </div>
   
    )
}

export default ShowRecipe;