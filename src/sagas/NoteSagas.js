import { all, takeLatest, select, put } from 'redux-saga/effects';
import NoteActions, { NoteTypes } from '../redux/NoteRedux';
import { callPromiseRequest } from '../libs/redux';

function* getAll(api, action) {
  const auth = yield select(state => state.auth);
  const request = () =>
    api.get('notes', null, {
      headers: { Authorization: auth.token },
    });

  yield callPromiseRequest(action, request);
}

function* getOne(api, action) {
  const { noteId } = action.payload;

  const auth = yield select(state => state.auth);
  const request = () =>
    api.get(`notes/${noteId}`, null, {
      headers: { Authorization: auth.token },
    });

  yield callPromiseRequest(action, request);
}

function* create(api, action) {
  const { note } = action.payload;
  const auth = yield select(state => state.auth);
  const request = data =>
    api.post('notes', data, {
      headers: { Authorization: auth.token },
    });

  const response = yield callPromiseRequest(action, request, note);

  if (response.ok) {
    yield put(NoteActions.getAllNotes());
  }
}

export default function*(api) {
  yield all([
    takeLatest(NoteTypes.GET_ALL_NOTES, getAll, api),
    takeLatest(NoteTypes.GET_ONE_NOTE, getOne, api),
    takeLatest(NoteTypes.CREATE_NOTE, create, api),
  ]);
}
