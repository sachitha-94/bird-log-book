import { PROFILE_REQUEST,PROFILE_RESPONSE } from '../constants';
import initialState from '../constants/initialStore';

const  profileReducer = (state = initialState.PROFILE, action) => {
  switch(action.type) {
    case PROFILE_REQUEST:
      return {
        ...state,
        isLoading:true
      };
      case PROFILE_RESPONSE:
        return {
          ...state,
          data:action.payload,
          isLoading:false
        };
    default:
      return state;
  }
}
export default profileReducer;