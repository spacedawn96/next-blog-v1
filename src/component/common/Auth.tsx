import React, { useReducer, createContext } from 'react';
import jwtDecode from 'jwt-decode';

const initialState = {
  user: null,
};
if (typeof window === 'undefined') {
  if (localStorage.getItem('jid')) {
    const decodedToken = jwtDecode(localStorage.getItem('jid'));

    if (decodedToken.exp * 1000 < Date.now()) {
      localStorage.removeItem('jid');
    } else {
      initialState.user = decodedToken;
    }
  }
}

const AuthContext = createContext({
  user: null,
  login: userData => {},
  logout: () => {},
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(userData) {
    if (typeof window === 'undefined') {
      localStorage.setItem('jid', userData.token);
    }
    dispatch({
      type: 'LOGIN',
      payload: userData,
    });
  }

  function logout() {
    if (typeof window === 'undefined') {
      localStorage.removeItem('jid');
    }
    dispatch({ type: 'LOGOUT' });
  }

  return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
