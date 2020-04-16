import React, { useState, useEffect, useContext } from 'react';
import ArticleTemplate from 'templates/ArticleTemplate';
import AddArticle from 'views/Articles/AddArticle';
import ArticleItem from 'views/Articles/ArticleItem';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import plusIcon from 'assets/icons/plus.svg';
import styled from 'styled-components';
import Heading from 'components/Heading/Heading';
import ArticlesAPI from '../../api/ArticlesApi';
import AuthContext from '../../context/AuthContext';
import EditArticle from './EditArticle';

const ContentWrapper = styled.div`
  width: 100%;
  margin: 20px 0 0 0;
`;

const StyledHeading = styled(Heading)`
  color: ${({ theme }) => theme.add};
  text-transform: uppercase;
  text-align: center;
`;

function ArticleList() {
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [create, setCreate] = useState(false);
  const [edit, setEdit] = useState(false);
  const { accessToken } = useContext(AuthContext);

  useEffect(() => {
    ArticlesAPI.getAllArticles()
      .then((articles) => setArticles(articles))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const toggleCreate = () => {
    setCreate((prevCreate) => !prevCreate);
    setEdit(false);
  };

  const handleRemoveArticle = (slug) => {
    ArticlesAPI.removeArticle(slug, accessToken).then(() => {
      setArticles((prevArticles) => {
        const articles = prevArticles.filter((article) => article.slug !== slug);
        return articles;
      });
    });
  };

  const handleEditArticle = (article) => {
    setArticle(article);
    setEdit((prevEdit) => !prevEdit);
    // console.log(article);
  };

  const updateArticle = (slug, updatedArticle) => {
    ArticlesAPI.replaceArticle(updatedArticle, accessToken).then(() => {
      setArticles((prevArticles) => {
        const articles = prevArticles.map((article) =>
          slug === article.slug ? updatedArticle : article,
        );
        return articles;
      });
      setEdit(false);
    });
  };

  const addArticle = (addedArticle) => {
    ArticlesAPI.addArticle(addedArticle, accessToken).then(() => {
      setArticles((prevArticles) => {
        const articles = [...prevArticles, addedArticle];
        return articles;
      });
      setCreate(false);
    });
  };

  return (
    <ContentWrapper>
      {loading ? 'Artykuły się ładują...' : null}
      {error ? 'Nie udało się załadować :(' : null}
      {!create || <AddArticle create={create} toggleCreate={toggleCreate} onCreate={addArticle} />}
      {edit ? (
        <EditArticle article={article} toggleEdit={handleEditArticle} onUpdate={updateArticle} />
      ) : (
        <>
          <StyledHeading>articles list</StyledHeading>
          {edit || <ButtonIcon icon={plusIcon} onClick={toggleCreate} add />}
          <ArticleTemplate articles={articles} accessToken={accessToken}>
            {articles.map((article, index) => (
              <ArticleItem
                key={article.slug}
                article={article}
                index={index}
                onEdit={() => handleEditArticle(article)}
                onDelete={() => handleRemoveArticle(article.slug)}
                accessToken={accessToken}
              />
            ))}
          </ArticleTemplate>
        </>
      )}
    </ContentWrapper>
  );
}

export default ArticleList;
