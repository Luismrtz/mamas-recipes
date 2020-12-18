import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { listRecipes, filterRecipes} from '../../actions/recipeActions';
import {Link} from 'react-router-dom';
import styles from './AllRecipes.module.scss';
import RecipeItem from '../recipeitem/RecipeItem';
import Pagination from '../pagination/Pagination';
import Loading from '../spinner/Loading';
import ErrorMsg from '../errormsg/ErrorMsg';
import Footer from '../footer/Footer';
import cx from 'classnames';
// import {Link} from 'react-router-dom';
// import Banner from '../Banner/Banner';
// import Loading from '../spinner/Loading'
// import MainSales from '../mainPageSales/MainSales';
// import ErrorMsg from '../ErrorMsg/ErrorMsg';
// import { useSelector, useDispatch } from 'react-redux';
// import { bannerProduct} from '../../actions/bannerActions';
// import { listProducts} from '../../actions/productActions';
// import Footer from '../Footer/Footer';


const Dishes = () => {


  const rList = useSelector(state => state.rList);
const {recipes, loading, error } = rList;


const [filter, setFilter] = useState(null);
const [isToggled, setToggled] = useState(true);
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostsPerPage] = useState(10);
//temp borderLine fix
const [borderNew, setBorderNew] = useState(true);
const [borderSpecial, setBorderSpecial] = useState(false);
const [borderAll, setBorderAll] = useState(false);
// temp numPage fix
const [fivePage, setFivePage] = useState(false);
const [tenPage, setTenPage] = useState(true);
const [fifPage, setFifPage] = useState(false);




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

const dispatch = useDispatch();

useEffect(() => {

  
   dispatch(listRecipes());    

  return () => {
     //
  }
}, [dispatch])




const showAll = () => {
  setFilter(recipes);
  ten(); //! quick fix to reset item entries
  setCurrentPage(1);
  setBorderNew(false);
  setBorderSpecial(false);
  setBorderAll(true);
}

const five = () => {
  setPostsPerPage(5);
  setCurrentPage(1);
  setFivePage(true);
  setTenPage(false);
  setFifPage(false);
}

const ten = () => {
  setPostsPerPage(10);
  setCurrentPage(1);
  setFivePage(false);
  setTenPage(true);
  setFifPage(false);
}

const fifteen = () => {
  setPostsPerPage(15);
  setCurrentPage(1);
  setFivePage(false);
  setTenPage(false);
  setFifPage(true);
}




const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;
const currentPosts = recipes && recipes.slice(indexOfFirstPost, indexOfLastPost); 

const newCurP = [...currentPosts].sort((a,b) => {

   return a.nameOfRecipe.localeCompare(b.nameOfRecipe)
})

const onePage = Math.ceil((recipes.length) / postsPerPage);

const paginate = (pageNumber) => setCurrentPage(pageNumber)


return loading ? <div><Loading/></div> :
error || !recipes ? <ErrorMsg variant="danger">{error}</ErrorMsg> :(

<div className={styles.mainContainer}>

<div className={styles.titleContainer}>

      <h1 className={cx(styles.title, styles.center)}>ALL RECIPES</h1>


  </div>

      
      
     <div className={ styles.itemsContainer }> 
    
  
    <div className={styles.flex}>
          <div className={styles.numPerPageGrid}>
            {onePage === 1 ? <div className={styles.textPerPage}>Showing all {recipes.length} results</div> 
                      :
              <div className={styles.textPerPage}>Showing {indexOfFirstPost + 1}-{indexOfFirstPost + currentPosts.length} of {recipes.length} results</div>
              }
              <div className={styles.numPerPageWrap}>
                  <div className={styles.showBtn}>show</div>
                  <button className={fivePage ? cx(styles.numPerPage, styles.borderLine) : styles.numPerPage} onClick={() => five()}>5</button>
                  <button className={tenPage ?cx(styles.numPerPage, styles.borderLine) : styles.numPerPage} onClick={() => ten()}>10</button>
                  <button className={fifPage ? cx(styles.numPerPage, styles.borderLine) : styles.numPerPage} onClick={() => fifteen()}>15</button>    
              </div>
          </div>
              

      {/* <div className={styles.icons}>
          <div onClick={() => setToggled(true)}><Grid alt="grid" className={styles.svg1}/></div>
        
          <div onClick={() => setToggled(false)}><List alt="list" className={styles.svg2}/></div>
      </div> */}

    </div>
   

          <div className={styles.grid}>
              {newCurP && newCurP.map(recipe => {
                 
                  return (
                      <RecipeItem  key={recipe._id} recipe={recipe} />
                      ) 
                  
              })}
          </div>

          <nav className={styles.navPagination}>
               <Pagination  postsPerPage={postsPerPage} totalPosts={ recipes.length} paginate={paginate}/>
          </nav>
          

              
    </div>

<Footer/>
</div>

    )
}

export default Dishes;