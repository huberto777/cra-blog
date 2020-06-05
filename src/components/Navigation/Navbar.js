import React from 'react';
import { NavLink } from 'react-router-dom';
import { routes } from '../../routes';
import AuthAPI from '../../api/AuthApi';

function Navbar({ onLogout, accessToken }) {
  const handleGetAuthUser = (accessToken) => {
    AuthAPI.getAuthUser(accessToken)
      .then((result) => {
        console.log(result);
        return result.name;
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
