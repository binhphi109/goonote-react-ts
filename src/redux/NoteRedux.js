import { createReducer } from 'reduxsauce';
import { createPromiseActions } from '../libs/redux';

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createPromiseActions({
  getAllNotes: [],
  getOneNote: ['noteId'],
  createNote: ['note'],
});

export const NoteTypes = Types;
export default Creators;

/* ------------- Selectors ------------- */

export const NoteSelectors = {
  selectNotes: state => state.notes.list,
};

/* ------------- Reducers ------------- */

export const reducer = {
  notes: createReducer({
      loading: null,
      error: null,
      list: null,
    }, {
      [Types.GET_ALL_NOTES_REQUEST]: (state, action) => {
        return state.merge({ loading: true });
      },
      [Types.GET_ALL_NOTES_SUCCESS]: (state, action) => {
        const list = action.payload;
        return state.merge({ loading: false, error: null, list });
      },
      [Types.GET_ALL_NOTES_FAILURE]: state => {
        return state.merge({ loading: false, error: true });
      },
    }
  ),
  note: createReducer({
      loading: null,
      error: null,
      item: null,
    }, {
      [Types.GET_ONE_NOTE_REQUEST]: (state, action) => {
        return state.merge({ loading: true });
      },
      [Types.GET_ONE_NOTE_SUCCESS]: (state, action) => {
        const item = action.payload;
        return state.merge({ loading: false, error: null, item });
      },
      [Types.GET_ONE_NOTE_FAILURE]: state => {
        return state.merge({ loading: false, error: true });
      },
    }
  ),
};
