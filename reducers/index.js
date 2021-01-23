import { combineReducers } from 'redux';
import profile from './profileReducer';
import logNotes from './logNoteReducer';

const rootReducer = combineReducers({
  profile,
  logNotes
});
export default rootReducer;