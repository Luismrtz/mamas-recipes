const { RECIPE_LIST_REQUEST, RECIPE_LIST_SUCCESS, RECIPE_LIST_FAIL, RECIPE_SAVE_REQUEST, RECIPE_SAVE_SUCCESS, RECIPE_SAVE_FAIL, RECIPE_DELETE_REQUEST, RECIPE_DELETE_SUCCESS, RECIPE_DELETE_FAIL, RECIPE_FILTER_REQUEST, RECIPE_FILTER_SUCCESS, RECIPE_FILTER_FAIL, RECIPE_DETAILS_REQUEST, RECIPE_DETAILS_SUCCESS, RECIPE_DETAILS_FAIL } = require("../constants/recipeConstants");

function recipeListReducer(state= { loading: true, recipes: []}, action) {

    switch (action.type) {
        case RECIPE_LIST_REQUEST: //send request to server to get list of products
            return { loading: true, recipes: []}; // for loading box during this case
        case RECIPE_LIST_SUCCESS: // received data from server
            return { ...state, loading: false, recipes: action.payload}; // 
        case RECIPE_LIST_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}


function recipeDetailsReducer(state= {loading: true}, action) {

    switch (action.type) {
        case RECIPE_DETAILS_REQUEST: //send request to server to get list of recipes
            return { loading: true}; // for loading box during this case
        case RECIPE_DETAILS_SUCCESS: // received data from server
            return { loading: false, recipe: action.payload}; // 
        case RECIPE_DETAILS_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}

function recipeFilterReducer(state= { loading: true, rec: []}, action) {

    switch (action.type) {
        case RECIPE_FILTER_REQUEST: //send request to server to get list of recipes
            return { ...state, loading: true}; // for loading box during this case
        case RECIPE_FILTER_SUCCESS: // received data from server
            return { ...state, loading: false, rec: action.payload}; // 
        case RECIPE_FILTER_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}


function recipeSaveReducer(state= {}, action) {

    switch (action.type) {
        case RECIPE_SAVE_REQUEST: //send request to server to get list of products
            return { loading: true}; // for loading box during this case
        case RECIPE_SAVE_SUCCESS: // received data from server
            return {...state, loading: false, success: true, recipe: action.payload}; // 
        case RECIPE_SAVE_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}


function recipeDeleteReducer(state= {}, action) {

    switch (action.type) {
        case RECIPE_DELETE_REQUEST: //send request to server to get list of products
            return { loading: true}; // for loading box during this case
        case RECIPE_DELETE_SUCCESS: // received data from server
            return {...state, loading: false, product: action.payload, success: true}; // 
        case RECIPE_DELETE_FAIL: // in case of an error
            return { loading: false, error: action.payload}
        default: 
            return state; // do not change state at all
        }
}

export {recipeListReducer, recipeDetailsReducer, recipeSaveReducer, recipeDeleteReducer, recipeFilterReducer}