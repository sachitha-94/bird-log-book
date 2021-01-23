import { GET_LOG_NOTE_REQUEST, GET_LOG_NOTE_RESPONSE, PROFILE_REQUEST, PROFILE_RESPONSE } from '../constants';
export function getLogNoteRequest(data) {
  return {
    type: GET_LOG_NOTE_REQUEST,
    payload: data
  }
}
export function getLogNoteResponse(data) {
  return {
    type: GET_LOG_NOTE_RESPONSE,
    payload: data
  }
}