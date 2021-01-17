import React from "react";
import { Link } from 'react-router-dom';
import styles from "./Footer.module.scss";
import {useSelector } from "react-redux";

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
                    <div className={styles.textSmall}><Link to="/showall">All</Link></div>
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
                    <h2 className={styles.textLarge}><Link to="/">SYMBOLS</Link></h2>

                </div>
            </div>
            <div className={styles.copyRight}>Copyright {(new Date().getFullYear())}, Luis Martinez</div>
        </div>
    </React.Fragment>
    
  );
}


export default Footer
