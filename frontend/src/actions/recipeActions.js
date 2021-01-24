import Axios from 'axios';
// import { async } from 'regenerator-runtime';
import { RECIPE_LIST_FAIL, RECIPE_LIST_REQUEST, RECIPE_LIST_SUCCESS, RECIPE_SAVE_REQUEST, RECIPE_SAVE_SUCCESS, RECIPE_SAVE_FAIL, RECIPE_DELETE_REQUEST, RECIPE_DELETE_SUCCESS, RECIPE_DELETE_FAIL, RECIPE_FILTER_REQUEST, RECIPE_FILTER_SUCCESS, RECIPE_FILTER_FAIL, RECIPE_DETAILS_REQUEST, RECIPE_DETAILS_SUCCESS, RECIPE_DETAILS_FAIL } from '../constants/recipeConstants';


const listRecipes = () => async (dispatch) => {
    try {
        dispatch({ type: RECIPE_LIST_REQUEST}); // 
        const requestPost = {
            method: 'GET',
            url: '/recipes',
            // data: product,
            // headers:  (userInfo && userInfo.token) ? {
            //     Authorization: 'Bearer ' + userInfo.token
            // } : {}
        }
        const {data} = await Axios(requestPost);
        if(data) {
            dispatch({ type: RECIPE_LIST_SUCCESS, payload: data})
        }
    }catch(error) {
        dispatch({type: RECIPE_LIST_FAIL, payload: error.response && error.response.data.message ?
            error.response.data.message
             :
            error.message })

    }
}

const saveRecipe = (recipe) => async (dispatch, getState) => {
    const { userSignin: { userInfo }} = getState();
    
    const requestPost = {
        method: 'POST',
        url: '/recipes/add',
        data: recipe,
        headers:  (userInfo && userInfo.token) ? {
            Authorization: 'Bearer ' + userInfo.token
        } : {}
    }

    const requestPatch = {
        method: 'PATCH',
        url: `/recipes/update/${recipe._id}`,
        data: recipe,
        headers:  (userInfo && userInfo.token) ? {
            Authorization: 'Bearer ' + userInfo.token
        } : {}
    }
    
    
    try {
        dispatch({ type: RECIPE_SAVE_REQUEST, payload: recipe});
        if(!recipe._id) {

            const { data } = await Axios(requestPost)
            if(data) {

                dispatch({ type: RECIPE_SAVE_SUCCESS, payload: data});
            }

        } else {

        const { data } = await Axios(requestPatch)
            if(data) {

                dispatch({ type: RECIPE_SAVE_SUCCESS, payload: data});
            }
        }


    } catch (error) {
        dispatch({type: RECIPE_SAVE_FAIL, payload: error.response && error.response.data.message ?
            error.response.data.message
             :
            error.message });
    }
}



const deleteRecipe = (recipeId) => async(dispatch, getState) => {
    const { userSignin: { userInfo }} = getState();
    const requestDelete = {
        method: 'DELETE',
        url: `/recipes/${recipeId}`,
        headers:  (userInfo && userInfo.token) ? {
            Authorization: 'Bearer ' + userInfo.token
        } : {}
    }

    try {
        dispatch({ type: RECIPE_DELETE_REQUEST, payload: recipeId});
        const { data } = await Axios(requestDelete);
        if (data) {
            dispatch({type: RECIPE_DELETE_SUCCESS, payload: data});
        }
    } catch(error) {
        dispatch({type: RECIPE_DELETE_FAIL, payload: error.response && error.response.data.message ?
            error.response.data.message
             :
            error.message})
    }
}

const filterRecipes = (q) => async (dispatch) => {
    try {
        dispatch({ type: RECIPE_FILTER_REQUEST}); // 
        const requestPost = {
            method: 'GET',
            url: '/recipes/filter', 
            params: {q: q} 
            
            // data: product,
            // headers:  (userInfo && userInfo.token) ? {
            //     Authorization: 'Bearer ' + userInfo.token
            // } : {}
        }
        const {data} = await Axios(requestPost);
        if(data) {
            dispatch({ type: RECIPE_FILTER_SUCCESS, payload: data})
        }
    }catch(error) {
        dispatch({type: RECIPE_FILTER_FAIL, payload: error.response && error.response.data.message ?
            error.response.data.message
             :
            error.message })

    }
}

const detailsRecipe = (recipeId) => async (dispatch) => {
    try {
        dispatch({type: RECIPE_DETAILS_REQUEST, payload: recipeId});
        const {data} = await Axios.get('/recipes/show' + recipeId);
        dispatch({type: RECIPE_DETAILS_SUCCESS, payload: data});
    } catch(error) {
        dispatch({type: RECIPE_DETAILS_FAIL, 
        payload:   error.response && error.response.data.message ?
        error.response.data.message
         :
        error.message
        })
    }
}

export { listRecipes, detailsRecipe, saveRecipe, deleteRecipe, filterRecipes}