import React from "react";
import { Link } from 'react-router-dom';
// import * as FaIcons from 'react-icons/fa';
// import * as AiIcons from 'react-icons/ai';
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
                    <div className={styles.textSmall}><Link to="/shop/jars">Jars</Link></div>
                    <div className={styles.textSmall}><Link to="/shop/cups">Cups</Link></div>
                    <div className={styles.textSmall}><Link to="/shop">Sales</Link></div>
                </div>
    
                <div >
                    <h2 className={styles.textLarge}>Profile</h2>
                    <div className={styles.textSmall}><Link to="/profile">Account</Link></div>
                    <div className={styles.textSmall}><Link to="/cart">Cart</Link></div>
                    {userInfo && (
                    <div className={styles.textSmall}><Link to="/ordermenu">Orders</Link></div>
                    )}
                </div>
                <div >
                    <h2 className={styles.textLarge}>Info</h2>
                    <div className={styles.textSmall}><Link to="/">About</Link></div>
                    
                </div>
                <div >
                    <h2 className={styles.textLarge}>SYMBOLS</h2>

                </div>
            </div>
            <div className={styles.copyRight}>Copyright {(new Date().getFullYear())}, Luis Martinez</div>
        </div>
    </React.Fragment>
    
  );
}


export default Footer
