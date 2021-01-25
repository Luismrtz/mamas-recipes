import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./MainPage.module.scss";
import Banner from "../banner/Banner";
import MainpageRecipe from "../mainpagerecipe/MainpageRecipe";
import Footer from "../footer/Footer";
import cx from "classnames";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import { listRecipes } from "../../actions/recipeActions";

const MainPage = () => {
  const rList = useSelector((state) => state.rList);
  const { recipes } = rList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listRecipes());
    return () => {
      //
    };
  }, [dispatch]);

  const newRecipes = [...recipes].sort((a, b) => {
    return b.updatedAt.localeCompare(a.updatedAt);
  });

  return (
    <React.Fragment>
      <div>
        <Banner />

        <div className={styles.displayContainer}>
          <div className={styles.imgOverlay}>
            <div className={styles.imgbtnMainWrap}>
              <div className={styles.imgWrap}>
                <img
                  className={styles.image}
                  src="images/bannerLarge1.jpg"
                  alt="duckens"
                />
              </div>

              <div className={styles.columnFlex}>
                <h1 className={styles.colorSecondary}>WELCOME!</h1>
                <h2 className={styles.colorSecondary}>
                  Thank you for visiting!
                </h2>
              </div>
            </div>
          </div>
          <div className={styles.imgOverlay}>
            <div className={styles.imgbtnMainWrap}>
              <div className={styles.imgWrap}>
                <img
                  className={styles.image}
                  src="images/bannerLarge2.jpg"
                  alt="duckens"
                />
              </div>

              <div className={styles.columnFlex}>
                <h2 className={styles.colorSecondary}>
                  Dirty your hands with these recipes!
                </h2>
                <Link
                  to={"/showall"}
                  className={cx(styles.mainButton, styles.btnPadding)}
                >
                  All Recipes
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.lineTitle}>
          <div className={styles.divLine}></div>
          <div className={styles.title}>Recent Recipes</div>
          <div className={styles.divLine}></div>
        </div>

        {/* //todo sales and new products          */}
        <div className={styles.grid}>
          {newRecipes &&
            newRecipes.slice(0, 8).map((recipe) => {
              // if (recipe.mainPage) {
              return <MainpageRecipe key={recipe._id} recipe={recipe} />;
              // }
              // return false;
            })}
        </div>
        <div className={styles.showAll}>
          <Link to={"/showall"}>
            <button className={styles.mainButton}>SHOW ALL</button>
          </Link>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default MainPage;
