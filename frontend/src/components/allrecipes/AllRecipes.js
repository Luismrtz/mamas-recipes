import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import styles from './AllRecipes.module.css';
// import {Link} from 'react-router-dom';
// import Banner from '../Banner/Banner';
// import Loading from '../spinner/Loading'
// import MainSales from '../mainPageSales/MainSales';
// import ErrorMsg from '../ErrorMsg/ErrorMsg';
// import { useSelector, useDispatch } from 'react-redux';
// import { bannerProduct} from '../../actions/bannerActions';
// import { listProducts} from '../../actions/productActions';
// import Footer from '../Footer/Footer';


const AllRecipes = () => {


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
          <div className={styles.color}>AllRecipes</div>
          <Link to={"/"} className={styles.btn}>
            <button>MAIN MENU</button>
          </Link>
          

      </React.Fragment>
    )
}

export default AllRecipes;