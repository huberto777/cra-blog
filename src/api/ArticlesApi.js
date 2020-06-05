import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/articles';
const ArticlesAPI = {
  async getAllArticles(accessToken) {
    const response = await axios.get(`${BASE_URL}`, accessToken);
    const articles = response.data;
    return articles;
  },
  async getArticle(slug) {
    const response = await axios.get(`${BASE_URL}/${slug}`);
    const article = response.data;
    return article;
  },
  async addArticle(articleToAdd, accessToken) {
    const response = await axios.post(`${BASE_URL}`, articleToAdd, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const addedArticle = response.data;
    return addedArticle;
  },
  async replaceArticle(articleToUpdate, accessToken) {
    if (!articleToUpdate.slug) {
      throw new Error('Article has to have an slug to be updated');
    }
    const response = await axios.put(`${BASE_URL}/${articleToUpdate.slug}`, articleToUpdate, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const updatedArticle = response.data;
    return updatedArticle;
  },
  async removeArticle(article, accessToken) {
    if (!article.slug) {
      throw new Error('Article has to have an slug to be deleted');
    }

    await axios.delete(`${BASE_URL}/${article.slug}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  },
};

export default ArticlesAPI;
