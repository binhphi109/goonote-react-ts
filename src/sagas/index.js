import { takeLatest, all, fork } from 'redux-saga/effects';

import API from '../services/Api';
import UserSagas from './UserSagas';
import NoteSagas from './NoteSagas';

const api = API.create();

export default function* root() {
  yield all([
    fork(UserSagas, api),
    fork(NoteSagas, api),
  ]);
}
