import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes';
import AuthAPI from '../../api/AuthApi';

function Navbar({ onLogout, accessToken }) {
  const handleGetAuthUser = (token) => {
    AuthAPI.getAuthUser(token)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <NavLink className="nav-link" activeClassName="active" onClick={onLogout} to={routes.home}>
      witaj, {handleGetAuthUser(accessToken)} / Logout
    </NavLink>
  );
}

export default Navbar;
