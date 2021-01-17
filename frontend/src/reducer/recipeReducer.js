const { RECIPE_LIST_REQUEST, RECIPE_LIST_SUCCESS, RECIPE_LIST_FAIL, RECIPE_SAVE_REQUEST, RECIPE_SAVE_SUCCESS, RECIPE_SAVE_FAIL, RECIPE_DELETE_REQUEST, RECIPE_DELETE_SUCCESS, RECIPE_DELETE_FAIL, RECIPE_FILTER_REQUEST, RECIPE_FILTER_SUCCESS, RECIPE_FILTER_FAIL, RECIPE_DETAILS_REQUEST, RECIPE_DETAILS_SUCCESS, RECIPE_DETAILS_FAIL } = require("../constants/recipeConstants");

function recipeListReducer(state= { loading: true, recipes: []}, action) {

    switch (action.type) {
        case RECIPE_LIST_REQUEST: 
            return { loading: true, recipes: []}; 
        case RECIPE_LIST_SUCCESS: 
            return { ...state, loading: false, recipes: action.payload}; 
        case RECIPE_LIST_FAIL:
            return { loading: false, error: action.payload}
        default: 
            return state; 
        }
}


function recipeDetailsReducer(state= {loading: true}, action) {

    switch (action.type) {
        case RECIPE_DETAILS_REQUEST:
            return { loading: true}; 
        case RECIPE_DETAILS_SUCCESS: 
            return { loading: false, recipe: action.payload};  
        case RECIPE_DETAILS_FAIL: 
            return { loading: false, error: action.payload}
        default: 
            return state; 
        }
}

function recipeFilterReducer(state= { loading: true, rec: []}, action) {

    switch (action.type) {
        case RECIPE_FILTER_REQUEST: 
            return { ...state, loading: true}; 
        case RECIPE_FILTER_SUCCESS: 
            return { ...state, loading: false, rec: action.payload}; 
        case RECIPE_FILTER_FAIL: 
            return { loading: false, error: action.payload}
        default: 
            return state; 
        }
}


function recipeSaveReducer(state= {}, action) {

    switch (action.type) {
        case RECIPE_SAVE_REQUEST: 
            return { loading: true}; 
        case RECIPE_SAVE_SUCCESS: 
            return {...state, loading: false, success: true, recipe: action.payload}; 
        case RECIPE_SAVE_FAIL: 
            return { loading: false, error: action.payload}
        default: 
            return state; 
        }
}


function recipeDeleteReducer(state= {}, action) {

    switch (action.type) {
        case RECIPE_DELETE_REQUEST: 
            return { loading: true}; 
        case RECIPE_DELETE_SUCCESS: 
            return {...state, loading: false, product: action.payload, success: true};  
        case RECIPE_DELETE_FAIL:
            return { loading: false, error: action.payload}
        default: 
            return state; 
        }
}

export {recipeListReducer, recipeDetailsReducer, recipeSaveReducer, recipeDeleteReducer, recipeFilterReducer}