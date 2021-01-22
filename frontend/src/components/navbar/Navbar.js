import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import NavSearch from '../searchbar/NavSearch'

import styles from "./Navbar.module.scss";
import cx from "classnames";
import {useSelector } from "react-redux";

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const [open, setOpen] = useState(false);



  const changeBackground = () => {
    if (window.scrollY >= 10) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  window.addEventListener("scroll", changeBackground);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  return (
    <nav className={styles.mainNavContainer}>
      <div
        className={
          navbar
            ? cx(styles.secNavContainer, styles.scrollCss)
            : cx(styles.secNavContainer)
        }
      >


        <div className={styles.navStart}>
          <ul className={cx(styles.navTitle)}>
            <Link to={"/"} className={styles.titleColor}>
              {" "}
              Mama's Recipes{" "}
            </Link>
          </ul>





          {/* //!switch between this for full screen  */}
          <ul className={cx(styles.navLinksContainer, styles.yup)}>
            <li className={styles.navLinkItem}>
              <Link
                to={"/"}
                className={cx(styles.iconButton, styles.underline)}
              >
                Home
              </Link>
            </li>







                    <NavHoverLinks />

            <li className={styles.navLinkItem}>
              {userInfo ? (
                <ul className={styles.fullScreenHover}>
                  <li>
                    <div className={cx(styles.iconButton)}>
                      {" "}
                      {userInfo.name}
                      <div>
                            {/*//todo replace with fa icon */}
                        {/* <MdIcon.MdKeyboardArrowDown
                          className={styles.arrowDown}
                        /> */}
                        <div   className={cx(styles.arrowDown, "fa fa-angle-down")}></div>
                      </div>
                    </div>
                  </li>

                  <div className={styles.onHoverMenu}>
                    <div className={styles.onHoverBlock}>
                      <span className={styles.onHoverArrow}></span>

                      <Link to={"/profile"} className={styles.iconButtonHov}>
                        Account
                      </Link>
                      

                      {userInfo.isAdmin && (
                        <Link
                          to={"/new"}
                          className={styles.iconButtonHov}
                        >
                          Create
                        </Link>
                      )}
                    </div>
                  </div>
                </ul>
              ) : (
                <Link
                  to={"/signin"}
                  className={cx(styles.iconButton, styles.underline)}
                >
                  Sign In
                </Link>
              )}
            </li>
            <ul className={styles.searchTogContainer}>

              <li className={styles.hamburgerDiv} onClick={(e) => setOpen(!open)}>
                  {/* <FaIcons.FaBars  /> */}
                  {open === false ? (

                    <div className={cx(styles.hamburgerToggle, 'fa fa-search')}></div>
                  )
                      :(
                         <div  className={cx(styles.hamburgerToggle, "fa fa-times")}></div>
                      )
                  }

              </li>

              <div className={ open === false ? 
                    cx(styles.fadeOut)
                  : cx(styles.searchContainer, styles.fadeIn)
                    }>
                  <NavSearch  open={open}/>

              </div>

            </ul>






 
          </ul>
          {/* //! Switch to this for Mobile mode */}

          <ul className={cx(styles.navLinksContainer, styles.nope)}>
            <li>
              <Link to={`${userInfo ? "/profile" : "/signin"}`}      
                className={cx(styles.mama, styles.borderbotNone)}
              >
                      {/*//todo replace with fa icon */}
                {/* <FaIcons.FaUser /> */}
                {userInfo ? <div>{userInfo.name}</div> :
                  <div></div>
                }
                
              </Link>
            </li>

            <li className={styles.mobileIcon}>
              <Dropdown />
            </li>

            <ul className={styles.searchTogContainer}>

      <li className={styles.hamburgerDiv} onClick={(e) => setOpen(!open)}>
          {/* <FaIcons.FaBars  /> */}
          {open === false ? (

            <div className={cx(styles.hamburgerToggle, 'fa fa-search')}></div>
          )
              :(
                <div className={cx(styles.hamburgerToggle, 'fa fa-times')}></div>
              )
          }

      </li>

<div className={ open === false ? 
      cx(styles.fadeOut)
    : cx(styles.searchContainer, styles.fadeIn)
      }>
    <NavSearch  className={styles.oranges} open={open}/>

</div>

</ul>

            
          </ul>

          {/* //!switch for both end */}
        </div>






      </div>
    </nav>
  );
}

//! call for onHover during full screens
function NavHoverLinks() {
  return (
    <ul className={styles.fullScreenHover}>
      <li>
        <div className={cx(styles.iconButton)}>
          {" "}
          Recipes
          <div>
                {/*//todo replace with fa icon */}
            {/* <MdIcon.MdKeyboardArrowDown className={styles.arrowDown} />  */}
            <div className={cx(styles.arrowDown, "fa fa-angle-down")}></div>
          </div>
        </div>
      </li>

      <div className={styles.onHoverMenu}>
        <div className={styles.onHoverBlock}>
          <span className={styles.onHoverArrow}></span>

          <Link to={"/showAll"} className={styles.iconButtonHov}>
            All
          </Link>
  
        </div>
      </div>
    </ul>
  );
}

export default Navbar;
