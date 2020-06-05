import React, { useEffect, useContext } from 'react';
import ArticleTemplate from 'templates/ArticleTemplate';
import AddArticle from 'views/Articles/AddArticle';
import ArticleItem from 'views/Articles/ArticleItem';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import plusIcon from 'assets/icons/plus.svg';
import styled from 'styled-components';
import Heading from 'components/Heading/Heading';
import { useDispatch, useSelector } from 'react-redux';
import ArticlesAPI from '../../api/ArticlesApi';
import AuthContext from '../../context/AuthContext';
import EditArticle from './EditArticle';
import {
  fetchAllArticles,
  addArticle,
  deleteArticle,
  createStart,
  editStart,
  replaceArticle,
} from '../../actions';

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
  const dispatch = useDispatch();
  const { accessToken } = useContext(AuthContext);
  const articlesLoading = useSelector((state) => state.loading);
  const articlesLoadingError = useSelector((state) => state.error);
  const articles = useSelector((state) => state.articles);
  const article = useSelector((state) => state.article);
  const create = useSelector((state) => state.create);
  const edit = useSelector((state) => state.edit);

  useEffect(() => {
    dispatch(fetchAllArticles(accessToken));
  }, [accessToken, dispatch]);

  const handleCreate = (createdArticle) => {
    try {
      ArticlesAPI.addArticle(createdArticle, accessToken).then((addedArticle) =>
        dispatch(addArticle(addedArticle)),
      );
    } catch (error) {
      console.log('Jest błąd przy tworzeniu timeboxa:', error);
    }
  };

  const toggleCreate = () => {
    dispatch(createStart());
  };

  const handleRemoveArticle = (article) => {
    dispatch(deleteArticle(article, accessToken));
  };

  const handleEditArticle = (article) => {
    dispatch(editStart(article));
  };

  const updateArticle = (updatedArticle) => {
    const articleToUpdate = { ...article, ...updatedArticle };
    ArticlesAPI.replaceArticle(articleToUpdate, accessToken).then(() =>
      dispatch(replaceArticle(articleToUpdate)),
    );
  };

  return (
    <ContentWrapper>
      {articlesLoading ? 'Artykuły się ładują...' : null}
      {articlesLoadingError ? 'Nie udało się załadować :(' : null}
      {!create || <AddArticle create={create} onToggle={toggleCreate} onCreate={handleCreate} />}
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
                onDelete={() => handleRemoveArticle(article)}
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
