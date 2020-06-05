import * as types from '../constants/types';

const initialState = {
  articles: [],
  article: {},
  loading: true,
  error: null,
  create: false,
  edit: false,
  searchQuery: '',
};

export function rootReducer(state = initialState, action = {}) {
  switch (action.type) {
    case types.ARTICLES_SET: {
      const { articles } = action;
      return { ...state, articles };
    }
    case types.ARTICLE_ADD: {
      const { article } = action;
      const articles = [...state.articles, article];
      return { ...state, articles, create: false };
    }
    case types.ARTICLE_REPLACE: {
      const { articleToUpdate } = action;
      const articles = state.articles.map((article) =>
        article.slug === articleToUpdate.slug ? articleToUpdate : article,
      );
      return { ...state, articles, edit: false };
    }
    case types.ARTICLE_REMOVE: {
      const { removedArticle } = action;
      const articles = state.articles.filter((article) => article.slug !== removedArticle.slug);
      return { ...state, articles };
    }
    case types.ARTICLE_CREATE_START: {
      return { ...state, create: !state.create };
    }
    case types.ARTICLE_EDIT_START: {
      const { article } = action;
      return { ...state, article, edit: !state.edit };
    }
    case types.ERROR_SET: {
      const { error } = action;
      return { ...state, error };
    }
    case types.LOADING_INDICATOR_DISABLE: {
      return { ...state, loading: false };
    }
    default:
      return state;
  }
}
