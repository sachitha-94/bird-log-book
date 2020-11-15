import { PROFILE_REQUEST,PROFILE_RESPONSE } from '../constants';
export function profileRequest(data) {
  return {
    type: PROFILE_REQUEST,
    payload: data
  }
}
export function profileResponse(data) {
  return {
    type: PROFILE_RESPONSE,
    payload: data
  }
}