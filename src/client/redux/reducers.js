import * as ActionTypes from './ActionTypes';

export const Articles = (state = {
        isLoading: true,
        errMess: null,
        articles: []
    }, action) =>{
    switch(action.type) {
        case ActionTypes.ADD_ARTICLES:
            return {...state, isLoading: false, errMess: null, articles: action.payload}

        case ActionTypes.ARTICLES_LOADING:
            return {...state, isLoading: true, errMess: null, articles: []}

        case ActionTypes.ARTICLES_FAILED:
            return {...state, isLoading: false, errMess: action.payload, articles: []}

        default:
            return state;
    }
}

export const Article = (state = {
    isLoading: true,
    errMess: null,
    article: null
}, action) =>{
    switch(action.type) {
        case ActionTypes.ADD_ARTICLE:
            return {...state, isLoading: false, errMess: null, article: action.payload}

        case ActionTypes.ARTICLE_LOADING:
            return {...state, isLoading: true, errMess: null, article: null}

        case ActionTypes.ARTICLE_FAILED:
            return {...state, isLoading: false, errMess: action.payload, article: null}

        default:
            return state;
    }
}

export const Filters = (state ={
    filters: {}
}, action) =>{
    let copy;
    switch(action.type) {
        case ActionTypes.ADD_FILTER:

            copy = state.filters;
            if(copy[action.payload.type]){
                copy[action.payload.type] = [...copy[action.payload.type], ...action.payload.filter];
            }else{
                copy[action.payload.type] = action.payload.filter;
            }

            return {...state, filters: copy};
        case ActionTypes.REMOVE_FILTER:

            copy = state.filters;
            copy[action.payload.type] = copy[action.payload.type].filter( item => !action.payload.filter.includes(item))

            return {...state, filters: copy}
        default:
            return state;
    }
}

export const Orders = (state ={
    orders: []
}, action) =>{
    switch(action.type) {
        case ActionTypes.ADD_ORDER:
            return {...state, orders: [...state.orders, ...action.payload]}
        case ActionTypes.REMOVE_ORDER:
            return {...state, orders: state.orders.filter( item => !action.payload.includes(item))}
        default:
            return state;
    }
}