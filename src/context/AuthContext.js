import React from 'react';

const AuthContext = React.createContext({
  accessToken: null,
  onLogout: null,
  onLoginAttempt: null,
  errorMessage: null
});

export default AuthContext;
