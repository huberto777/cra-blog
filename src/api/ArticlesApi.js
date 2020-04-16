import axios from 'axios';

const BASE_URL = 'http://localhost:8000/api/articles';
const ArticlesAPI = {
  async getAllArticles() {
    const response = await axios.get(`${BASE_URL}`);
    const articles = response.data;
    return articles;
  },
  async getArticle(slug) {
    const response = await axios.get(`${BASE_URL}/${slug}`);
    const article = response.data;
    return article;
  },
  async addArticle(articleToAdd, accessToken) {
    const response = await axios.post(`${BASE_URL}`, articleToAdd, accessToken);
    const addedArticle = response.data;
    return addedArticle;
  },
  async replaceArticle(articleToUpdate, accessToken) {
    if (!articleToUpdate.slug) {
      throw new Error('Article has to have an slug to be updated');
    }
    const response = await axios.put(`${BASE_URL}/${articleToUpdate.slug}`, articleToUpdate, accessToken);
    const updatedArticle = response.data;
    return updatedArticle;
  },
  async removeArticle(slug, accessToken) {
    if (!slug) {
      throw new Error('Article has to have an slug to be deleted');
    }

    await axios.delete(`${BASE_URL}/${slug}`, accessToken);
  },
};

export default ArticlesAPI;
