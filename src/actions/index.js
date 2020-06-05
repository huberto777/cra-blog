import ArticlesAPI from '../api/ArticlesApi';
import * as types from '../constants/types';

export const setArticles = (articles) => ({
  type: types.ARTICLES_SET,
  articles,
});

export const addArticle = (article) => ({
  type: types.ARTICLE_ADD,
  article,
});

export const replaceArticle = (articleToUpdate) => ({
  type: types.ARTICLE_REPLACE,
  articleToUpdate,
});

export const removeArticle = (removedArticle) => ({
  type: types.ARTICLE_REMOVE,
  removedArticle,
});

export const editStart = (article) => ({
  type: types.ARTICLE_EDIT_START,
  article,
});

export const setError = (error) => ({
  type: types.ERROR_SET,
  error,
});

export const disableLoadingIndicator = () => ({
  type: types.LOADING_INDICATOR_DISABLE,
});

export const createStart = () => ({
  type: types.ARTICLE_CREATE_START,
});

// redux-thunk
export const fetchAllArticles = (accessToken) => (dispatch) => {
  ArticlesAPI.getAllArticles(accessToken)
    .then((articles) => dispatch(setArticles(articles)))
    .catch((error) => dispatch(setError(error)))
    .finally(() => dispatch(disableLoadingIndicator()));
};

export const deleteArticle = (article, accessToken) => (dispatch) => {
  ArticlesAPI.removeArticle(article, accessToken).then(() => {
    dispatch(removeArticle(article));
  });
};
