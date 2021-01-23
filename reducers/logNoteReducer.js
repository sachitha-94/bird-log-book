import { GET_LOG_NOTE_REQUEST, GET_LOG_NOTE_RESPONSE, PROFILE_REQUEST, PROFILE_RESPONSE } from '../constants';
import initialState from '../constants/initialStore';

const profileReducer = (state = initialState.LOG_NOTE, action) => {
  switch (action.type) {
    case GET_LOG_NOTE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_LOG_NOTE_RESPONSE:
      return {
        ...state,
        data: action.payload,
        isLoading: false
      };
    default:
      return state;
  }
}
export default profileReducer;