import * as ActionTypes from './ActionTypes';
import axios from 'axios';

// Single Article
export const loadArticle = (id) => (dispatch) =>{
  dispatch(articleLoading(true));

  return axios.get('/api/article/' + id)
  .then(res =>{
      if (res.status === 200) {
          return res;
      }
      else{
          var error = new Error('Error ' + res.status + ': ' + res.statusText);
          error.res = res;
          throw error;
      }
  },
  error =>{
      var errmess = new Error(error.message);
      throw errmess;
  })
  .then( res => {
      return res.data.article
  })
  .then( article => dispatch(addArticle(article)))
  .catch( err => {
      dispatch(articleFailed(err))
  });
}

export const articleLoading = () => ({
  type: ActionTypes.ARTICLE_LOADING
});

export const articleFailed = (errmess) =>({
  type: ActionTypes.ARTICLE_FAILED,
  payload: errmess
});

export const addArticle = (article) => ({
    type: ActionTypes.ADD_ARTICLE,
    payload: article
});

// Articles
export const loadArticles = () => (dispatch) =>{
    dispatch(articlesLoading(true));

    return axios.get('/api/articles')
      .then(res =>{
          if (res.status === 200) {
              return res;
          }
          else{
              var error = new Error('Error ' + res.status + ': ' + res.statusText);
              error.res = res;
              throw error;
          }
      },
      error =>{
          var errmess = new Error(error.message);
          throw errmess;
      })
      .then( res => res.data.articles)
      .then( articles => dispatch(addArticles(articles)))
      .catch( err => {
          dispatch(articlesFailed(err))
      });
}

export const articlesLoading = () => ({
    type: ActionTypes.ARTICLES_LOADING
});

export const articlesFailed = (errmess) =>({
    type: ActionTypes.ARTICLES_FAILED,
    payload: errmess
});

export const addArticles = (articles) => ({
  type: ActionTypes.ADD_ARTICLES,
  payload: articles
});

export const sortArticles = (articles, sortType, order = 'DESC') => (dispatch) => {
    switch(sortType){
        case 'alphabetical':
            articles.sort( (a, b) =>{
                if(a.title > b.title){
                    if(order.toLowerCase() === 'asc'){
                        return 1;
                    }else{
                        return -1;
                    }
                }
                if(a.title < b.title ){
                    if(order.toLowerCase() === 'asc'){
                        return -1;
                    }else{
                        return 1;
                    }
                }
                return 0
            });
            break;
        case 'date':
            articles.sort( (a, b) =>{
                if(a.published_at > b.published_at){
                    if(order.toLowerCase() === 'asc'){
                        return 1;
                    }else{
                        return -1;
                    }
                }
                if(a.published_at < b.published_at ){
                    if(order.toLowerCase() === 'asc'){
                        return -1;
                    }else{
                        return 1;
                    }
                }
                return 0
            });
            break;
        default:
            break;
    }
    dispatch(addArticles(articles));
    dispatch(addOrder([sortType + '-' + (order.toLowerCase() === 'asc' ? 'asc' : 'desc')]))
    return dispatch(removeOrder([sortType + '-' + (order.toLowerCase() === 'asc' ? 'desc' : 'asc')]))
};

export const addOrder = (order) => ({
    type: ActionTypes.ADD_ORDER,
    payload: order
});

export const removeOrder = (order) => ({
    type: ActionTypes.REMOVE_ORDER,
    payload: order
});

export const addFilter = (type, filter) => ({
    type: ActionTypes.ADD_FILTER,
    payload: {type: type, filter: filter}
});

export const removeFilter = (type, filter) => ({
    type: ActionTypes.REMOVE_FILTER,
    payload: {type: type, filter: filter}
});