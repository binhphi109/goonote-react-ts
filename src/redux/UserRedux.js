import { createReducer } from 'reduxsauce';
import { createPromiseActions } from '../libs/redux';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createPromiseActions({
  login: ['username', 'password'],
  logout: null,
  register: ['email', 'username', 'password'],
});

export const UserTypes = Types;
export default Creators;

/* ------------- Selectors ------------- */

export const UserSelectors = {
  selectUser: state => state.auth.user,
  selectToken: state => state.auth.token,
};

/* ------------- Initial State ------------- */

export const INITIAL_STATE = {
  loading: null,
  error: null,
  email: null,
  username: null,
  token: null,
  authenticated: null,
  user: null,
};

/* ------------- Reducers ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.LOGIN_REQUEST]: (state, action) => {
    const { username } = action.payload;
    return { ...state, loading: true, username };
  },
  [Types.LOGIN_SUCCESS]: (state, action) => {
    const { token, user } = action.payload;
    return { ...state, loading: false, error: null, authenticated: true, token, user };
  },
  [Types.LOGIN_FAILURE]: state => {
    return {
      ...state,
      loading: false,
      error: true,
      token: null,
      user: null,
    };
  },
  [Types.LOGOUT]: (state, action) => {
    return INITIAL_STATE;
  },
  [Types.REGISTER_REQUEST]: (state, action) => {
    const { email, username } = action.payload;
    return { ...state, loading: true, email, username };
  },
  [Types.REGISTER_SUCCESS]: (state, action) => {
    const { token, user } = action.payload;
    return { ...state, loading: false, error: null, authenticated: true, token, user };
  },
  [Types.REGISTER_FAILURE]: state => {
    return {
      ...state,
      loading: false,
      error: true,
      token: null,
      user: null,
    };
  },
});
