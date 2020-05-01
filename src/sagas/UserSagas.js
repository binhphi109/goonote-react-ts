import { all, takeLatest } from 'redux-saga/effects';
import { UserTypes } from '../redux/UserRedux';
import { callPromiseRequest } from '../libs/redux';

function* login(api, action) {
  const user = action.payload;
  const request = data => api.post('users/signin', data);

  yield callPromiseRequest(action, request, user);
}

function* register(api, action) {
  const user = action.payload;
  const request = data => api.post('users/signup', data);

  yield callPromiseRequest(action, request, user);
}

export default function*(api) {
  yield all([
    takeLatest(UserTypes.LOGIN, login, api),
    takeLatest(UserTypes.REGISTER, register, api),
  ]);
}
