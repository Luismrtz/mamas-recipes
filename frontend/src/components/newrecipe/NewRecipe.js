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
    const [ingredients, setIngredients] = useState('');
    const [instructions, setInstructions] = useState('');


    const [visibility, setVisibility] = useState(false);

    const rList = useSelector(state => state.rList);
    const {recipes} = rList;
    //const {products, loading, error} = pList;



    const recipeSave = useSelector(state => state.recipeSave);
    const {loading: loadingSave, success: successSave, error: errorSave} = recipeSave;

    const recipeDelete = useSelector(state => state.recipeDelete);
    const { success: successDelete, error: errorDelete} = recipeDelete;
    // //const {loading: loadingDelete, success: successDelete, error: errorDelete} = productDelete;

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

    // const editItem = (product) => {
    //     setVisibility(true);
    //     setId(product._id);
    //     setName(product.name);
    //     setDescription(product.description);
    //     setIngredients(product.ingredients);
    //     setInstructions(product.instructions);

       
    // }
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



  

    // const uploadFileHandler = (e) => {
    //     const file = e.target.files[0];
    //     const bodyFormData = new FormData();
    //     const requestPost = {
    //         method: 'POST',
    //         url: '/uploads',
    //         data: bodyFormData,
    //         headers:  (userInfo && userInfo.token) ? {
    //             Authorization: 'Bearer ' + userInfo.token
    //         } : {}
    //     }

    //     bodyFormData.append('image', file);
    //     setUploading(true);
    //     Axios(requestPost).then(response => {
    //         setImg(response.data);
    //         setUploading(false);
    //     }).catch(err => {
    //         setUploading(false);
    //     })
    // }

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
                    <textarea type="text" name="ingredients" id="ingredients" value={ingredients || ''} onChange={(e) => setIngredients(e.target.value)}></textarea>
                </li>
                <li>
                    <label htmlFor="instructions">
                        Instructions
                    </label>
                    <textarea type="text" name="instructions" id="instructions" value={instructions || ''} onChange={(e) => setInstructions(e.target.value)}></textarea>
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