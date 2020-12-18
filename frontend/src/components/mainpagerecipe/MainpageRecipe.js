import React from 'react';
import styles from './MainpageRecipe.module.scss';
import {Link} from 'react-router-dom';

import cx from 'classnames';
import PropTypes from 'prop-types';

const MainpageRecipe = ({recipe: {_id, nameOfRecipe, description}}) => {



    return  (
      
        <div className={styles.container}>
           

            <div   className={styles.imgOverlay}>
              <img className={styles.image} src='images/morning.jpg' alt="duckens"/>
    
                               
              <div className={styles.overlayContainer}>
                    
                    <Link to={'/showrecipe/' + _id}  className={styles.overlay}></Link> 
                    <div className={styles.bwrapper}>
                            <Link to={'/showrecipe/' + _id} className={styles.button1}>Item Details</Link>
                    
                            
                    </div>
             </div>
      
            </div>
            <div className={styles.infoWrap}>

                <h1 className={styles.title}>{nameOfRecipe}</h1>
                <p>{description}</p>

            </div>

            <div className={styles.textWrap}>
                    <div className={styles.typeWrap}><p>dessert</p></div>
                    <div className={styles.timeWrap}><p>fa-time 1hr 20mins</p></div>
                
                    
            </div>
            


            {/* <div className={styles.contents}>
                <div className={ styles.contDesc}>
                    <h1 className={styles.title}>{title}</h1>
                {sale === false ? (<h2 className={styles.price}>${price.toFixed(2)}</h2>) : 
                        (<div className={styles.discountWrapper}> 
                            <h2 className={styles.price}>${discount.toFixed(2)}</h2>
                            <h2 className={styles.sale}>${price.toFixed(2)}</h2>
                        </div>) }
                    <h3 className={ styles.nope}>{info}</h3>
                  
                </div>
     
            </div> */}
            
        </div> 
     
    )
}
export default MainpageRecipe;

// MainpageRecipe.propTypes = {
//     product: PropTypes.shape({
//         _id: PropTypes.string,
//         title: PropTypes.string,
//         img: PropTypes.string,
//         price: PropTypes.number,
//         inCart: PropTypes.bool
//     }).isRequired
// }