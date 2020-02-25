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