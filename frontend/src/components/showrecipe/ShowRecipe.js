import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { detailsRecipe } from "../../actions/recipeActions";
import Loading from "../spinner/Loading";
import ErrorMsg from "../errormsg/ErrorMsg"
import styles from "./ShowRecipe.module.scss";
import cx from "classnames";
import Footer from "../footer/Footer";

const ShowRecipe = (props) => {
  const dispatch = useDispatch();
  const rDetails = useSelector((state) => state.rDetails);
  const { recipe, loading, error } = rDetails;

  const productId = props.match.params.id;

  useEffect(() => {
    dispatch(detailsRecipe(productId));
    return () => {};
  }, [dispatch, productId]);

  return loading ? <div><Loading/></div> :
  error ? <ErrorMsg variant="danger">{error}</ErrorMsg> : (
    <div>
      <div className={styles.spacing}>
        <h1 className={styles.recTitle}>{recipe && recipe.nameOfRecipe}</h1>
        <div className={styles.infoWrap}>
          <div className={styles.flex}>
            <div className={styles.picwrapper}>
              <div className={styles.momPic}>
                <img
                  className={styles.image}
                  src="/images/bannerLarge1.jpg"
                  alt="mom"
                />
              </div>
              <h4 className={styles.author}>Mama</h4>
            </div>

            <div className={styles.recipeType}>
              {recipe && recipe.beverage ? (
                <div
                  className={cx(
                    styles.iconFlex,
                    recipe && recipe.beverage && "fa fa-coffee"
                  )}
                  aria-hidden="true"
                >
                  <h4 className={styles.iconGap}>
                    {recipe && recipe.beverage ? "Beverage" : ""}
                  </h4>
                </div>
              ) : recipe && recipe.dessert ? (
                <div
                  className={cx(
                    styles.iconFlex,
                    recipe && recipe.dessert && "fa fa-birthday-cake"
                  )}
                  aria-hidden="true"
                >
                  <h4 className={styles.iconGap}>
                    {recipe && recipe.dessert ? "Dessert" : ""}
                  </h4>
                </div>
              ) : recipe && recipe.dish ? (
                <div
                  className={cx(
                    styles.iconFlex,
                    recipe && recipe.dish && "fa fa-cutlery"
                  )}
                  aria-hidden="true"
                >
                  <h4 className={styles.iconGap}>
                    {recipe && recipe.dish ? "Dish" : ""}
                  </h4>
                </div>
              ) : (
                <div></div>
              )}

              <div className={styles.timeWrap}>
                <div className="fa fa-clock-o fa-lg"></div>
                <h4 className={styles.iconGap}>
                  {recipe && recipe.time ? recipe.time : "N/A"}
                </h4>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.comRevWrapper}>
          <div className={styles.commentCount}>
            <div className="fa fa-comment-o" aria-hidden="true"></div>
            <div className={styles.comNum}>0</div>
          </div>

          <ul className={styles.rating}>
            <li className="fa fa-star" aria-hidden="true"></li>
            <li className="fa fa-star" aria-hidden="true"></li>
            <li className="fa fa-star" aria-hidden="true"></li>
            <li className="fa fa-star" aria-hidden="true"></li>
            <li className="fa fa-star" aria-hidden="true"></li>
          </ul>
        </div>

        <div className={styles.lineTitle}>
          <div className={styles.divLine}></div>
        </div>
        <div className={styles.recipeDesc}>{recipe && recipe.description}</div>
        <div className={styles.slider}>
          <div className={styles.slide}>
            <div className={styles.bContainer}>
              <img
                src={recipe && recipe.img ? recipe.img : "/images/morning.jpg"}
                alt="slider-img"
                className={styles.imgStyles}
              ></img>
            </div>
          </div>
        </div>

        <h1>Ingredients</h1>
        <div>
          {recipe &&
            recipe.ingredients.map((ingredient) => (
              <div key={ingredient._id} className={styles.divy}>
                <input type="checkbox" id={ingredient._id} name="strike" />

                <label htmlFor={ingredient._id}>
                  <p> {ingredient.ingredient}</p>
                </label>
              </div>
            ))}
        </div>
        <h1>Instructions</h1>
        <ol>
          {recipe &&
            recipe.instructions.map((step) => (
              <li key={step._id}>
                <p>{step.step}</p>
              </li>
            ))}
        </ol>
      </div>
      <Footer />
    </div>
  );
};

export default ShowRecipe;
