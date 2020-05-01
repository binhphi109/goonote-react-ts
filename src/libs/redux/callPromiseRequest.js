import { call, put } from 'redux-saga/effects';
import { v4 as uuid} from 'uuid';

function mapIdForObject(item) {
  if (typeof item === 'object') {
    Object.keys(item).forEach(key => {
      if (key === '_id') {
        item.id = uuid();
      } else {
        item[key] = mapWithId(item[key]);
      }
    });
  }
  return item;
}

export function mapWithId(data) {
  if (data !== null) {
    if (data instanceof Array) {
      data = data.map(item => {
        return mapIdForObject(item);
      });
    } else if (typeof data === 'object') {
      return mapIdForObject(data);
    }
  }
  return data;
}

export default function*(action, api, ...args) {
  yield put({ type: `${action.type}_REQUEST`, payload: action.payload });

  const response = yield call(api, ...args);
  
  if (response.ok) {
    const data = mapWithId(response.data);

    action.promise.resolve(data);
    yield put({ type: `${action.type}_SUCCESS`, payload: data });
  } else {
    action.promise.reject();
    yield put({ type: `${action.type}_FAILURE`, payload: {} });
  }

  return response;
}
