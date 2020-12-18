import React , { useState, useEffect, useCallback} from 'react';
// import Searchbar from '../searchbar/SearchBar'
import {Link} from 'react-router-dom';
import styles from './Banner.module.scss'

import cx from 'classnames';
import BannerSearch from '../searchbar/BannerSearch';



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


const Banner = (props) => {
    const { width } = useViewport();
    const breakpoint = 768;




    return (
        <div >

          <div className={styles.slider}>
          <div className={styles.slide}>
          <div className={styles.bContainer}>
                <img src={width < breakpoint ? 'images/bannerLarge1.jpg' : 'images/bannerLarge2.jpg'} alt="slider-img"  className={styles.imgStyles}></img>
               <div className={styles.bannerTitle}>
                    <h3>Do you like cooking?</h3>
                    <h1>Mama's got you covered</h1>
                    <BannerSearch />
               </div>
                
                {/* <Link to={`${link}`} className={styles.block}>
                    <div className={styles.innerBlock}>
                        <div  className={styles.bannerText}>{info}</div>
                    </div>
                </Link> */}
            </div>


            </div>
        </div>
    </div>





    )



}

export default Banner;