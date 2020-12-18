import React from 'react';
import styles from './RecipeItem.module.scss';
import {Link} from 'react-router-dom';
import cx from 'classnames';
// import PropTypes from 'prop-types';


const RecipeItem = ({recipe: {_id, nameOfRecipe, description}}) => {

   

    return  (
      
        <div className={styles.container}>
           

            <div   className={styles.imgOverlay}>
              <img className={styles.image} src='images/morning.jpg' alt="duckens"/>
              {/* <img className={styles.image} src={'/' + img} alt="duckens"/> */}
 

  
              
              <div className={styles.overlayContainer}>
                    
                    <Link to={'/showrecipe/' + _id}  className={styles.overlay}></Link> 
                    <div className={styles.bwrapper}>
                            <Link to={'/showrecipe/' + _id} className={styles.button1}>recipe Details</Link>
                           
                    </div>
  
             </div>
                   

                    
            </div>
            <div className={styles.contents}>
                <div className={styles.contDesc}>
                    <h1 className={styles.title}>{nameOfRecipe}</h1>


                </div>
               

            </div>

        </div> 
     
    )
}
export default RecipeItem;

// ProductItem.propTypes = {
//     product: PropTypes.shape({
//         _id: PropTypes.string,
//         title: PropTypes.string,
//         img: PropTypes.string,
//         price: PropTypes.number,
//         inCart: PropTypes.bool
//     }).isRequired
// }