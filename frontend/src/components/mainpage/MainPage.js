import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './MainPage.module.css';
import Searchbar from '../searchbar/SearchBar'
import CardList from '../cardlist/CardList'
// import {Link} from 'react-router-dom';
// import Banner from '../Banner/Banner';
// import Loading from '../spinner/Loading'
// import MainSales from '../mainPageSales/MainSales';
// import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { useSelector, useDispatch } from 'react-redux';
// import { bannerProduct} from '../../actions/bannerActions';
import { listRecipes, filterRecipes} from '../../actions/recipeActions';

// import Footer from '../Footer/Footer';


const MainPage = (props) => {



const rList = useSelector(state => state.rList);
const {recipes, loading, error } = rList;

const recipeFilter = useSelector(state => state.recipeFilter);
const {rFilter, loading: rLoading, error: rError} = recipeFilter;

// const [state, setState] = useState({
//   results: []
// })


const shit = (e) => {

    props.history.push("/search");
  
}


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
    return (

      <React.Fragment>
          <div className={styles.color}>MainPage</div>
          <Link to={"/showall"} className={styles.btn}>
            <button>SHOW ALL</button>
          </Link>
          <Link to={"/new"} className={styles.btn}>
            <button>Create Recipe</button>
          </Link>

          <button onClick={shit}>shit</button>
<Searchbar props={props}/>
<CardList  recipes={rFilter}/>

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