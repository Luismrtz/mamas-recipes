import React, { useState } from "react";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import NavSearch from '../searchbar/NavSearch'
import { useHistory } from 'react-router-dom';
// import * as FaIcons from "react-icons/fa";
// import * as MdIcon from "react-icons/md";
import styles from "./Navbar.module.scss";
import cx from "classnames";
import {useSelector } from "react-redux";

function Navbar({noov}) {
  const history = useHistory();
  const [navbar, setNavbar] = useState(false);



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

  const handleChange = e => {
     e.preventDefault();
    history.push(`/search?q=test`);
  }
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
              Mamas Recipes{" "}
            </Link>
          </ul>
          <NavSearch  className={styles.oranges}/>
          <div onClick={handleChange}> test </div>
          {/* <CardList  recipes={rFilter}/> */}

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
                        <div   className={styles.arrowDown}>^</div>
                      </div>
                    </div>
                  </li>

                  <div className={styles.onHoverMenu}>
                    <div className={styles.onHoverBlock}>
                      <span className={styles.onHoverArrow}></span>

                      <Link to={"/profile"} className={styles.iconButtonHov}>
                        Account
                      </Link>
                      
                      <Link to={"/ordermenu"} className={styles.iconButtonHov}>
                        Orders
                      </Link>
                      {userInfo.isAdmin && (
                        <Link
                          to={"/pushItems"}
                          className={styles.iconButtonHov}
                        >
                          Push Items
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

 
          </ul>
          {/* //! Switch to this for Mobile mode */}

          <ul className={cx(styles.navLinksContainer, styles.nope)}>
            <li>
              <Link    
                      to={`${userInfo ? "/profile" : "/signin"}`}      
                className={cx(styles.mobileIcon, styles.borderbotNone)}
              >
                      {/*//todo replace with fa icon */}
                {/* <FaIcons.FaUser /> */}
                <div>User</div>
              </Link>
            </li>

            <li className={styles.mobileIcon}>
              <Dropdown />
            </li>
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
          Store
          <div>
                {/*//todo replace with fa icon */}
            {/* <MdIcon.MdKeyboardArrowDown className={styles.arrowDown} />  */}
            <div className={styles.arrowDown}>^</div>
          </div>
        </div>
      </li>

      <div className={styles.onHoverMenu}>
        <div className={styles.onHoverBlock}>
          <span className={styles.onHoverArrow}></span>

          <Link to={"/shop/jars"} className={styles.iconButtonHov}>
            Jars
          </Link>
          <Link to={"/shop/cups"} className={styles.iconButtonHov}>
            Cups
          </Link>
          <Link to={"/shop"} className={styles.iconButtonHov}>
            sales
          </Link>
        </div>
      </div>
    </ul>
  );
}

export default Navbar;
