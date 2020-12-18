import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './MainPage.module.scss';
import Banner from '../banner/Banner';
import Slider from 'react-slick';
import Searchbar from '../searchbar/SearchBar'
import CardList from '../cardlist/CardList'
import MainpageRecipe from '../mainpagerecipe/MainpageRecipe'
import Footer from '../footer/Footer';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
// import {Link} from 'react-router-dom';
// import Banner from '../Banner/Banner';
// import Loading from '../spinner/Loading'
// import MainSales from '../mainPageSales/MainSales';
// import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { useSelector, useDispatch } from 'react-redux';
// import { bannerProduct} from '../../actions/bannerActions';
import { listRecipes, filterRecipes} from '../../actions/recipeActions';

// import Footer from '../Footer/Footer';


const MainPage = () => {



const rList = useSelector(state => state.rList);
const {recipes, loading, error } = rList;

const recipeFilter = useSelector(state => state.recipeFilter);
const {rFilter, loading: rLoading, error: rError} = recipeFilter;

// const [state, setState] = useState({
//   results: []
// })


// const shit = (e) => {
//   e.preventDefault();
//     props.history.push("/search?q=test");
  
// }



const dispatch = useDispatch();


useEffect(() => {
  dispatch(listRecipes());
  return () => {
     //
  }
}, [dispatch])



console.log(recipes)
console.log(recipes && recipes[0])

    // return loading ? <div><Loading/></div> :
    // error || !banners ? <ErrorMsg variant="danger">{error}</ErrorMsg> :


    // myArray.sort(function compare(a, b) {
    //   var dateA = new Date(a.date);
    //   var dateB = new Date(b.date);
    //   return dateA - dateB;
    // });

    const newRecipes = [...recipes].sort((a,b) => {

      return b.updatedAt.localeCompare(a.updatedAt)
   })


    return (


      
      <React.Fragment>
          {/* <banner /> */}
          {/* categories title  */}
          {/* categories image overlay * 4 */}
          {/* latest recipes title  */}
          {/* latest recipes max 6  */}
          {/* view more button  */}
          {/* footer  */}
          {/* copyright  */}

        <div className={styles.secNavContainer}>
        <Banner />
        {/* <h2 className={styles.color}>Categories</h2> */}
    
          <div className={styles.displayContainer}>
            <div className={styles.imgOverlay}>
                <div className={styles.imgbtnMainWrap}>

                  <div className={styles.imgWrap}>

                        <img className={styles.image} src='images/bannerLarge1.jpg' alt="duckens"/>
                  </div>
                  {/* <Link to={'/shop/cups'}  className={styles.overlayWrapper}></Link>  */}
                  {/* <div className={styles.bwrapper}> */}
                  <div className={styles.columnFlex}>
                    <h1>WELCOME!</h1>
                    <h2>
                      Thank you for tuning in to our spetacular show and stuff YEEE.  Come dine with us today!@
                    </h2>
                  </div>

                </div>
                {/* </div> */}
            
              </div>
            <div className={styles.imgOverlay}>
                <div className={styles.imgbtnMainWrap}>

                  <div className={styles.imgWrap}>

                        <img className={styles.image} src='images/bannerLarge2.jpg' alt="duckens"/>
                  </div>
                  {/* <Link to={'/shop/cups'}  className={styles.overlayWrapper}></Link>  */}
                  {/* <div className={styles.bwrapper}> */}
                  <div className={styles.columnFlex}>
                    <h2>Come get your hands dirty with these recipes!</h2>
                    <Link to={'/dishes'} className={styles.mainButton}>All Recipes</Link>
                  </div>

                </div>
                {/* </div> */}
            
              </div>

         </div>

        <div className={styles.lineTitle}>
                <div className={styles.divLine}></div>
                <div className={styles.title}>
                     Recent Recipes
                </div>
                <div className={styles.divLine}></div>
        </div>
            


            {/* //todo sales and new products          */}
          <div className={styles.grid}>
                        {newRecipes && newRecipes.slice(0,6).map(recipe => {
                            // if (recipe.mainPage) {
                            return (
                                <MainpageRecipe  key={recipe._id} recipe={recipe} />
                                ) 
                            // }
                            // return false;
                        })}
          </div>


          <Link to={"/showall"} className={styles.btn}>
            <button>SHOW ALL</button>
          </Link>
          <Link to={"/new"} className={styles.btn}>
            <button>Create Recipe</button>
          </Link>

          {/* <button onClick={shit}>shit</button> */}
{/* <Searchbar props={props}/>
<CardList  recipes={rFilter}/> */}

      {/* {recipes && recipes.map((recipe) => (
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

      } */}




        </div>
        <Footer/>
      </React.Fragment>
    )
}

export default MainPage;