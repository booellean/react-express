import {createStore, combineReducers, applyMiddleware} from 'redux';
import { Articles, Article } from './articles';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
            articles: Articles,
            article: Article
        }),
        applyMiddleware(thunk, logger)
    );

    return store;
}