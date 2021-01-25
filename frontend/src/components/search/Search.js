import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Search.module.scss";

import { filterRecipes } from "../../actions/recipeActions";
import { useLocation } from "react-router-dom";

import Searchbar from "../searchbar/SearchBar";
import Footer from "../footer/Footer";
import RecipeItem from "../recipeitem/RecipeItem";
import cx from "classnames";

const Search = (props) => {
  const { search } = useLocation();

  const rList = useSelector((state) => state.rList);
  const { error } = rList;

  const recipeFilter = useSelector((state) => state.recipeFilter);
  const { rec } = recipeFilter;

  const searchParams = new URLSearchParams(search);

  const q = searchParams.get("q");

  const dispatch = useDispatch();
  useEffect(() => {
    if (q === null) {
      props.history.push("/");
    }

    dispatch(filterRecipes(q));

    return () => {
      //
    };
  }, [dispatch, q, props.history]);

  return error ? (
    <div>{error}</div>
  ) : (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div className={styles.searchContainer}>
          <Searchbar />
        </div>
        <h1 className={cx(styles.title, styles.center)}>{q}</h1>
      </div>

      <div className={styles.itemsContainer}>
        <div className={styles.grid}>
          {rec &&
            rec.map((recipe) => {
              return <RecipeItem key={recipe._id} recipe={recipe} />;
            })}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Search;
