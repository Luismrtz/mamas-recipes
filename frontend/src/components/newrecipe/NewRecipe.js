import React, { useEffect, useState } from "react";
import styles from "./NewRecipe.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import cx from "classnames";
import Filter from "../filter/Filter";
import Footer from "../footer/Footer";
import Axios from "axios";
import ErrorMsg from "../errormsg/ErrorMsg";
import {
  listRecipes,
  saveRecipe,
  deleteRecipe,
} from "../../actions/recipeActions";

const NewRecipe = (props) => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [isDessert, setIsDessert] = useState(false);
  const [isBeverage, setIsBeverage] = useState(false);
  const [isDish, setIsDish] = useState(false);

  const [sort, setSort] = useState("");
  const [filter, setFilter] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const [visibility, setVisibility] = useState(false);

  const rList = useSelector((state) => state.rList);
  const { recipes } = rList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const recipeSave = useSelector((state) => state.recipeSave);
  const { success: successSave, error: errorSave } = recipeSave;

  const recipeDelete = useSelector((state) => state.recipeDelete);
  const { success: successDelete } = recipeDelete;

  const dispatch = useDispatch();

  useEffect(() => {
    if (successSave) {
      setVisibility(false);
    }
    dispatch(listRecipes());
    return () => {
      //
    };
  }, [dispatch, successSave, successDelete]);

  const editItem = (recipe) => {
    setVisibility(true);
    setId(recipe._id);
    setName(recipe.nameOfRecipe);
    setImg(recipe.img);
    setTime(recipe.time);
    setDescription(recipe.description);
    setIngredients(recipe.ingredients || "");
    setInstructions(recipe.instructions || "");
    setIsDessert(recipe.dessert);
    setIsBeverage(recipe.beverage);
    setIsDish(recipe.dish);
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();

    bodyFormData.append("image", file);
    setUploading(true);

    try {
      const { data } = await Axios.post("/uploads/s3", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + userInfo.token,
        },
      });
      setImg(data);
      setUploading(false);
    } catch (error) {
      setErrorUpload(error.message);
      setUploading(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveRecipe({
        _id: id,
        nameOfRecipe: name,
        img,
        description,
        ingredients,
        time,
        instructions,
        beverage: isBeverage,
        dish: isDish,
        dessert: isDessert,
      })
    );
  };

  const deleteHandler = (recipe) => {
    if (window.confirm("Are you sure you want to delete?")) {
      dispatch(deleteRecipe(recipe._id));
    }
  };

  function handleChange(i, e) {
    const values = [...ingredients];
    values[i].ingredient = e.target.value;
    setIngredients(values);
  }

  function handleRemove(i) {
    if (window.confirm("Are you sure you want to delete?")) {
      const values = [...ingredients];
      values.splice(i, 1);
      setIngredients(values);
    }
  }

  function handleAdd() {
    const values = [...ingredients];
    values.push({ ingredient: "" });
    setIngredients(values);
  }

  function handleChange2(i, e) {
    const values = [...instructions];
    values[i].step = e.target.value;
    setInstructions(values);
  }

  function handleRemove2(i) {
    if (window.confirm("Are you sure you want to delete?")) {
      const values = [...instructions];
      values.splice(i, 1);
      setInstructions(values);
    }
  }

  function handleAdd2() {
    const values = [...instructions];
    values.push({ step: "" });
    setInstructions(values);
  }

  let sorting = (e) => {
    const sorting = e.target.value;

    let recipesNew = recipes.filter((filtRec) => {
      switch (sorting) {
        case "all":
          return filtRec;
        case "dish":
          return filtRec.dish === true;
        case "dessert":
          return filtRec.dessert === true;
        case "beverage":
          return filtRec.beverage === true;
        default:
          return null;
      }
    });
    setSort(sorting);
    setFilter(recipesNew);
  };

  const currentPosts = filter === null ? recipes && recipes : filter && filter;

  const newCurP = [...currentPosts].sort((a, b) => {
    return a.nameOfRecipe.localeCompare(b.nameOfRecipe);
  });

  return (
    <div className={styles.pageContainer}>
      <div className={styles.titleWrapper}>
        <h3>PRODUCTS</h3>
      </div>

      <div className={styles.filterTableWrapper}>
        <div className={styles.filterWrapper}>
          <Link to={"/"} className={styles.btn}>
            <button className={cx(styles.button, styles.buttonSize)}>
              HOME
            </button>
          </Link>
          <div>
            <Filter sorting={sorting} sort={sort} />
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Recipe</th>
                <th>Buttons</th>
              </tr>
            </thead>

            <tbody>
              {newCurP &&
                newCurP.map((recipe) => (
                  <tr key={recipe._id}>
                    <td>
                      <Link to={"/showrecipe/" + recipe._id}>{recipe._id}</Link>
                    </td>
                    <td>
                      <Link to={"/showrecipe/" + recipe._id}>
                        {recipe.nameOfRecipe}
                      </Link>
                    </td>

                    <td>
                      <button
                        className={styles.button}
                        onClick={() => editItem(recipe)}
                      >
                        Edit
                      </button>{" "}
                      <button
                        className={cx(styles.button, styles.deleteColor)}
                        onClick={() => deleteHandler(recipe)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={styles.buttonWrapper}>
          {visibility === false ? (
            <button className={styles.button} onClick={() => editItem({})}>
              Create Product
            </button>
          ) : (
            <button
              type="button"
              className={cx(styles.button)}
              onClick={(e) => setVisibility(!visibility)}
            >
              Back
            </button>
          )}
        </div>
      </div>

      {visibility && (
        <div className={styles.form}>
          {errorSave && <ErrorMsg variant="danger">{errorSave}</ErrorMsg>}
          <form onSubmit={submitHandler}>
            <ul className={styles.formWrapper}>
              <li>
                <h2 className={styles.title}>Create a Recipe</h2>
              </li>

              <li>
                <label htmlFor="name" className={styles.formMargin}>
                  <h3>Name of Recipe</h3>
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={name || ""}
                  onChange={(e) => setName(e.target.value)}
                ></input>
              </li>
              <li htmlFor="img">
                <h3>Image</h3>

                <input
                  type="text"
                  name="image"
                  id="img"
                  value={img || ""}
                  onChange={(e) => setImg(e.target.value)}
                ></input>
                <input
                  type="file"
                  label="Choose Image"
                  id="imgFile"
                  onChange={uploadFileHandler}
                ></input>
                {uploading && <div>Uploading...</div>}
                {errorUpload && (
                  <ErrorMsg variant="danger">{errorUpload}</ErrorMsg>
                )}
              </li>

              <li>
                <label htmlFor="description" className={styles.formMargin}>
                  <h3>Description</h3>
                </label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description || ""}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </li>
              <li>
                <div
                  className={cx(
                    styles.lineFlex,
                    styles.formMargin,
                    styles.alignCenter
                  )}
                >
                  <label htmlFor="ingredients">
                    <h3>Ingredients</h3>
                  </label>
                  <button
                    className={cx(styles.button, styles.btnAdd)}
                    type="button"
                    onClick={() => handleAdd()}
                  >
                    +
                  </button>
                  <p>(Click to add another line)</p>
                </div>

                {ingredients &&
                  ingredients.map((ingredient, idx) => {
                    return (
                      <div
                        className={styles.lineFlex}
                        key={`${ingredient}-${idx}`}
                      >
                        <textarea
                          type="text"
                          name="ingredient"
                          id="ingredient"
                          placeholder="Enter ingredient"
                          value={ingredient.ingredient || ""}
                          onChange={(e) => handleChange(idx, e)}
                        />
                        <div>
                          <button
                            className={cx(styles.button, styles.btnDel)}
                            type="button"
                            onClick={() => handleRemove(idx)}
                          >
                            X
                          </button>
                          <button
                            className={cx(
                              styles.button,
                              styles.btnAdd,
                              styles.btnVisible
                            )}
                            type="button"
                            onClick={() => handleAdd()}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </li>
              <li>
                <div
                  className={cx(
                    styles.lineFlex,
                    styles.formMargin,
                    styles.alignCenter
                  )}
                >
                  <label htmlFor="instructions">
                    <h3>Instructions</h3>
                  </label>
                  <button
                    className={cx(styles.button, styles.btnAdd)}
                    type="button"
                    onClick={() => handleAdd2()}
                  >
                    +
                  </button>
                  <p>(Click to add another line)</p>
                </div>
                {instructions &&
                  instructions.map((step, idx) => {
                    return (
                      <div className={styles.lineFlex} key={`${step}-${idx}`}>
                        <textarea
                          type="text"
                          name="step"
                          id="step"
                          placeholder="Enter step"
                          value={step.step || ""}
                          onChange={(e) => handleChange2(idx, e)}
                        />
                        <div>
                          <button
                            className={cx(styles.button, styles.btnDel)}
                            type="button"
                            onClick={() => handleRemove2(idx)}
                          >
                            X
                          </button>
                          <button
                            className={cx(
                              styles.button,
                              styles.btnAdd,
                              styles.btnVisible
                            )}
                            type="button"
                            onClick={() => handleAdd2()}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    );
                  })}
              </li>
              <li>
                <label htmlFor="description" className={styles.formMargin}>
                  <h3>Average cooking time</h3>
                </label>
                <input
                  type="text"
                  name="time"
                  id="time"
                  value={time || ""}
                  onChange={(e) => setTime(e.target.value)}
                ></input>
              </li>
              <h3 className={styles.formMargin}> Choose one please!</h3>
              <div className={styles.checkWrapper}>
                <li className={styles.checkFlex}>
                  <input
                    type="checkbox"
                    checked={isDessert || ""}
                    name="isDessert"
                    id="isDessert"
                    value={isDessert || ""}
                    onChange={(e) => setIsDessert(!isDessert)}
                  ></input>
                  <label htmlFor="isDessert">Dessert</label>
                </li>
                <li className={styles.checkFlex}>
                  <input
                    type="checkbox"
                    checked={isDish || ""}
                    name="isDish"
                    id="isDish"
                    value={isDish || ""}
                    onChange={(e) => setIsDish(!isDish)}
                  ></input>
                  <label htmlFor="isDish">Dish</label>
                </li>
                <li className={styles.checkFlex}>
                  <input
                    type="checkbox"
                    checked={isBeverage || ""}
                    name="isBeverage"
                    id="isBeverage"
                    value={isBeverage || ""}
                    onChange={(e) => setIsBeverage(!isBeverage)}
                  ></input>
                  <label htmlFor="isBeverage">Beverage</label>
                </li>
              </div>

              <div className={styles.buttonWrapper}>
                <li>
                  <button
                    type="submit"
                    className={cx(styles.button, styles.buttonSize)}
                  >
                    {id ? "Update" : "Create"}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={cx(styles.button, styles.buttonSize)}
                    onClick={(e) => setVisibility(!visibility)}
                  >
                    Back
                  </button>
                </li>
              </div>
            </ul>
          </form>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default NewRecipe;
