import React from "react";
import { Link } from 'react-router-dom';
import styles from "./Footer.module.scss";
import {useSelector } from "react-redux";
import cx from 'classnames';
function Footer() {
 
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
//a test
  return (
    <React.Fragment>
        <div className={styles.container}>
            <div className={styles.innerContainer}>
  
               
         

                <div >
                    <h2 className={styles.textLarge}>Navigation</h2>
                    <div className={styles.textSmall}><Link to="/showall" className={styles.primaryColor}>All Recipes</Link></div>
                </div>
    
                <div >
                    <h2 className={styles.textLarge}>Profile</h2>
                    {userInfo && ( 
                        <>
                    <div className={styles.textSmall}><Link to="/profile">Profile</Link></div>
                    <div className={styles.textSmall}><Link to="/new">Create</Link></div>
                        </>
                    )}
                </div>
                <div >
                    <h2 className={styles.textLarge}>Info</h2>
                    <div className={styles.textSmall}><Link to="/">Home</Link></div>
                    
                </div>
                <div >
                    <div ><Link className={styles.title} to="/">Mama's Recipes</Link></div>

                </div>
            </div>
            <div className={styles.copyRight}>Copyright {(new Date().getFullYear())}, Luis Martinez</div>
        </div>
    </React.Fragment>
    
  );
}


export default Footer
