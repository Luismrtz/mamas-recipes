import React, {useEffect, useState} from 'react';
import styles from './NewRecipe.module.css';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import cx from 'classnames';
// import Loading from '../spinner/Loading';
// import ErrorMsg from '../ErrorMsg/ErrorMsg';
import { listRecipes, saveRecipe, deleteRecipe} from '../../actions/recipeActions';
// import Axios from 'axios';


const NewRecipe = (props) => {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [ingredients, setIngredients] = useState([{ ingredient:''}]);
    const [instructions, setInstructions] = useState([{step: ''}]);

    // const onChangeField = fieldName => ({target}) => setIngredients(state => {(...state, [fieldName]:target.value)})

    const [visibility, setVisibility] = useState(false);

    const rList = useSelector(state => state.rList);
    const {recipes} = rList;
    //const {products, loading, error} = pList;



    const recipeSave = useSelector(state => state.recipeSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = recipeSave;

    const recipeDelete = useSelector(state => state.recipeDelete);
    const { success: successDelete, error: errorDelete} = recipeDelete;

    const dispatch = useDispatch();

    useEffect(() => {
        if (successSave) {
            setVisibility(false);
        }
         dispatch(listRecipes());
        return () => {
            //
            
        }
    // }, [dispatch,successSave, successDelete])
    }, [dispatch, successSave, successDelete])

    const editItem = (recipe) => {
        setVisibility(true);
        setId(recipe._id);
        setName(recipe.nameOfRecipe);
        setDescription(recipe.description);
        setIngredients(recipe.ingredients);
        setInstructions(recipe.instructions);

       
    }
    

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(saveRecipe({ _id: id, nameOfRecipe: name, description, ingredients, instructions,
        }));
    }

    const deleteHandler = (recipe) => {
        if(window.confirm('Are you sure you want to delete?')) {
            dispatch(deleteRecipe(recipe._id))
        }
    }



    function handleChange(i, e) {
        const values = [...ingredients];
        values[i].ingredient = e.target.value;
        setIngredients(values);
    }

    function handleRemove(i) {
        const values = [...ingredients];
        values.splice(i, 1);
        setIngredients(values);
      }

      function handleAdd() {
        const values = [...ingredients];
        values.push({ ingredient: '' });
        setIngredients(values);
      }


      function handleChange2(i, e) {
        const values = [...instructions];
        values[i].step = e.target.value;
        setInstructions(values);
    }

    function handleRemove2(i) {
        const values = [...instructions];
        values.splice(i, 1);
        setInstructions(values);
      }


      function handleAdd2() {
        const values = [...instructions];
        values.push({ step: '' });
        setInstructions(values);
      }

    console.log(recipes)


    return (
    <div className={styles.pageWrapper}>

        <div className={styles.content}>
            <div >
                <h3>PRODUCTS</h3>
               
            </div>
            <Link to={"/"} className={styles.btn}>
            <button>HOME</button>
          </Link>
           
            <div className={styles.productList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Recipe</th>                        
                        </tr>
                    </thead>

                    <tbody>
                        {recipes && recipes.map((recipe) => (
                            <tr key={recipe._id}>
                                <td>{recipe._id}</td>
                                <td>{recipe.nameOfRecipe}</td>
                             
                                <td className={styles.btnwrap}>
                                    <button className={styles.button} onClick={()=> editItem(recipe)}>
                                        Edit
                                    </button>{' '}
                                    <button className={styles.button} onClick={() => deleteHandler(recipe)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
  


            </div>
            <div className={styles.buttonContainer}>
                    {visibility === false ? 

                    <button className={styles.button} onClick={() => editItem({})}>Create Product</button>
                    : 
                    <button type="button" className={cx(styles.button)} onClick={(e) => setVisibility(!visibility)}>Back</button>
                    }
                 </div>
        </div>

       {visibility && 
        <div className={styles.form}>
            <form onSubmit={submitHandler}>
            <ul className={styles.formContainer}>
                <li>
                    <h2 className={styles.title}>Create a Recipe</h2>
                </li>
   
                <li>
                    <label htmlFor="name">
                        Name of Recipe
                    </label>
                    <input type="text" name="name" id="name" value={name || ''} onChange={(e) => setName(e.target.value)}></input>
                </li>


                <li>
                    <label htmlFor="description">
                        Description
                    </label>
                    <input type="text" name="description" id="description" value={description || ''} onChange={(e) => setDescription(e.target.value)}></input>
                </li>
                <li>
                    <label htmlFor="ingredients">
                        Ingredients
                    </label>
                    <button type="button" onClick={() => handleAdd()}>
                         +
                    </button>
                    {
                        ingredients.map((ingredient, idx) => {
                            return(
                                <div key={`${ingredient}-${idx}`}>
                                    <input 
                                        type="text"
                                        name="ingredient"
                                        id="ingredient"
                                        placeholder="Enter ingredient"
                                        value={ingredient.ingredient || ''}
                                        onChange={e => handleChange(idx, e)}
                                    />
                                 <button type="button" onClick={() => handleRemove(idx)}>
                                      X
                                 </button>
                                </div>
                            )
                        })
                    }
                    {/* <textarea type="text" name="ingredients" id="ingredients" value={ingredients.field1 || ''} onChange={onChangeField('field1')}></textarea> */}
                </li>
                <li>
                    <label htmlFor="instructions">
                        Instructions
                    </label>
                    <button type="button" onClick={() => handleAdd2()}>
                         +
                    </button>
                    {
                        instructions.map((step, idx) => {
                            return(
                                <div key={`${step}-${idx}`}>
                                    <input 
                                        type="text"
                                        name="step"
                                        id="step"
                                        placeholder="Enter step"
                                        value={step.step || ''}
                                        onChange={e => handleChange2(idx, e)}
                                    />
                                 <button type="button" onClick={() => handleRemove2(idx)}>
                                      X
                                 </button>
                                </div>
                            )
                        })
                    }
                    {/* <textarea type="text" name="instructions" id="instructions" value={instructions || ''} onChange={(e) => setInstructions(e.target.value)}></textarea> */}
                </li>


  
                <li>
                    <button type="submit" className={cx(styles.button, styles.buttonSize)}>{id? "Update" : "Create"}</button>
                </li>
                <li>
                    <button type="button" className={cx(styles.button, styles.buttonSize)} onClick={(e) => setVisibility(!visibility)}>Back</button>
                </li>
              
            </ul>
            </form>
        </div>
}

    </div>
      
    )
}

export default NewRecipe;