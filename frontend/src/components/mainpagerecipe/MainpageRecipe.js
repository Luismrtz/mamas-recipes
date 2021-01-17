import React from 'react';
import styles from './MainpageRecipe.module.scss';
import {Link} from 'react-router-dom';

import cx from 'classnames';

import PropTypes from 'prop-types';

const MainpageRecipe = ({recipe: {_id, nameOfRecipe, description, beverage, dessert, dish}}) => {



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

                <ul>
                    <li className="fa fa-star" aria-hidden="true" ></li>
                    <li className="fa fa-star" aria-hidden="true" ></li>
                    <li className="fa fa-star" aria-hidden="true" ></li>
                    <li className="fa fa-star" aria-hidden="true" ></li>
                    <li className="fa fa-star" aria-hidden="true" ></li>

                </ul>
                <p>{description}</p>

            </div>

            <div className={styles.textWrap}>
                    {/* <div className={styles.typeWrap}><div className="fa fa-clock-o"></div><p>dessert</p></div> */}

                    <div className={styles.recipeType}>
                        <div className={cx(styles.iconFlex, (beverage) && "fa fa-coffee fa-lg" )} aria-hidden="true"><p className={styles.iconGap}>{beverage ? 'beverage' : ''}</p></div>
                        <div className={cx(styles.iconFlex, (dessert) && "fa fa-birthday-cake fa-lg" )} aria-hidden="true"><p className={styles.iconGap}>{dessert ? 'dessert' : ''}</p></div>
                        <div className={cx(styles.iconFlex, (dish) && "fa fa-cutlery fa-lg" )} aria-hidden="true"><p className={styles.iconGap}>{dish ? 'dish' : ''}</p></div>
                    </div>
                    <div className={styles.timeWrap}><div className="fa fa-clock-o fa-lg"></div><p className={styles.iconGap}>1hr 20mins</p></div>
                
                    
            </div>
            
            
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