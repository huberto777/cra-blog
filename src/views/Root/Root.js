import React, { useState, useEffect } from 'react';
import MainTemplate from 'templates/MainTemplate';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { routes } from 'routes';
import ArticleList from 'views/Articles/ArticleList';
import ShowArticle from 'views/Articles/ShowArticle';
import EditComment from 'views/Comments/EditComment';
import Navigation from 'components/Navigation/Navigation';
import Login from 'views/Auth/Login';
import Register from 'views/Auth/Register';
import AuthContext from '../../context/AuthContext';
import AuthAPI from '../../api/AuthApi';

function Root() {
  const [accessToken, setAccessToken] = useState(null);
  const [previousLoginAttemptFailed, setPreviousLoginAttemptFailed] = useState(false);

  const getAccessToken = () => {
    setAccessToken(localStorage.getItem('accessToken'));
  };

  const handleLogout = () => {
    setAccessToken(localStorage.removeItem('accessToken'));
  };

  useEffect(() => {
    getAccessToken();
    const intID = setInterval(() => {
      handleLogout();
    }, 3600000);
    return () => clearInterval(intID);
  });

  const handleLoginAttempt = (credentials) => {
    AuthAPI.login(credentials)
      .then(({ access_token }) => {
        localStorage.setItem('accessToken', access_token);
        setPreviousLoginAttemptFailed(false);
        getAccessToken();
        // console.log(response)
      })
      .catch((error) => {
        setPreviousLoginAttemptFailed(true);
        console.log(error);
      });
  };

  return (
    <BrowserRouter>
      <MainTemplate>
        <AuthContext.Provider
          value={{
            accessToken,
            onLoginAttempt: handleLoginAttempt,
            onLogout: handleLogout,
            errorMessage: previousLoginAttemptFailed ? 'Nie udało się zalogować' : undefined,
          }}
        >
          <Navigation />
          <Switch>
            <Route path={routes.register} component={Register} />
            <Route exact path={routes.home} render={() => <Redirect to="/articles" />} />
            <Route exact path={routes.articles} component={ArticleList} />
            <Route exact path={routes.showArticle} component={ShowArticle} />
            <Route exact path={routes.login} component={Login} />
            {accessToken ? (
              <>
                <Route exact path={routes.editComment} component={EditComment} />
              </>
            ) : (
              <Login />
            )}{' '}
          </Switch>
        </AuthContext.Provider>
      </MainTemplate>
    </BrowserRouter>
  );
}

export default Root;
