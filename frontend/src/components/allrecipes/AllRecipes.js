import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { listRecipes } from "../../actions/recipeActions";
import styles from "./AllRecipes.module.scss";
import RecipeItem from "../recipeitem/RecipeItem";
import Pagination from "../pagination/Pagination";
import Loading from "../spinner/Loading";
import ErrorMsg from "../errormsg/ErrorMsg";
import Footer from "../footer/Footer";
import Filter from "../filter/Filter";
import cx from "classnames";

const AllRecipes = () => {
  const rList = useSelector((state) => state.rList);
  const { recipes, loading, error } = rList;

  const [filter, setFilter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [fivePage, setFivePage] = useState(false);
  const [tenPage, setTenPage] = useState(true);
  const [fifPage, setFifPage] = useState(false);

  const [sort, setSort] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listRecipes());

    return () => {
      //
    };
  }, [dispatch]);

  const five = () => {
    setPostsPerPage(5);
    setCurrentPage(1);
    setFivePage(true);
    setTenPage(false);
    setFifPage(false);
  };

  const ten = () => {
    setPostsPerPage(10);
    setCurrentPage(1);
    setFivePage(false);
    setTenPage(true);
    setFifPage(false);
  };

  const fifteen = () => {
    setPostsPerPage(15);
    setCurrentPage(1);
    setFivePage(false);
    setTenPage(false);
    setFifPage(true);
  };

  let sorting = (e) => {
    const sorting = e.target.value;

    let recipesNew = recipes.filter((filtRec) => {
      switch (sorting) {
        case "all":
          setCurrentPage(1);
          return filtRec;
        case "dish":
          setCurrentPage(1);
          return filtRec.dish === true;
        case "dessert":
          setCurrentPage(1);
          return filtRec.dessert === true;
        case "beverage":
          setCurrentPage(1);
          return filtRec.beverage === true;
        default:
          return null;
      }
    });
    setSort(sorting);
    setFilter(recipesNew);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (filter === null
    ? recipes && recipes
    : filter && filter
  ).slice(indexOfFirstPost, indexOfLastPost);

  const newCurP = [...currentPosts].sort((a, b) => {
    return a.nameOfRecipe.localeCompare(b.nameOfRecipe);
  });

  const onePage = Math.ceil(
    (filter === null ? recipes : filter).length / postsPerPage
  );
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return loading ? (
    <div>
      <Loading />
    </div>
  ) : error || !recipes ? (
    <ErrorMsg variant="danger">{error}</ErrorMsg>
  ) : (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <h1 className={cx(styles.title, styles.center)}>ALL RECIPES</h1>
      </div>

      <div className={styles.itemsContainer}>
        <div className={styles.flex}>
          <div className={styles.numPerPageGrid}>
            {onePage === 1 ? (
              <div className={styles.textPerPage}>
                Showing all {(filter === null ? recipes : filter).length}{" "}
                results
              </div>
            ) : (
              <div className={styles.textPerPage}>
                Showing {indexOfFirstPost + 1}-
                {indexOfFirstPost + currentPosts.length} of{" "}
                {(filter === null ? recipes : filter).length} results
              </div>
            )}
            <div className={styles.numPerPageWrap}>
              <div className={styles.showBtn}>show</div>
              <button
                className={
                  fivePage
                    ? cx(styles.numPerPage, styles.borderLine)
                    : styles.numPerPage
                }
                onClick={() => five()}
              >
                5
              </button>
              <button
                className={
                  tenPage
                    ? cx(styles.numPerPage, styles.borderLine)
                    : styles.numPerPage
                }
                onClick={() => ten()}
              >
                10
              </button>
              <button
                className={
                  fifPage
                    ? cx(styles.numPerPage, styles.borderLine)
                    : styles.numPerPage
                }
                onClick={() => fifteen()}
              >
                15
              </button>
            </div>
          </div>
          <div>
            <Filter sorting={sorting} sort={sort} />
          </div>
        </div>

        <div className={styles.grid}>
          {newCurP &&
            newCurP.map((recipe) => {
              return <RecipeItem key={recipe._id} recipe={recipe} />;
            })}
        </div>

        <nav className={styles.navPagination}>
          <Pagination
            postsPerPage={postsPerPage}
            totalPosts={(filter === null ? recipes : filter).length}
            paginate={paginate}
          />
        </nav>
      </div>

      <Footer />
    </div>
  );
};

export default AllRecipes;
