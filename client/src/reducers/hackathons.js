import {
  REQUEST_HACKATHONS, RECEIVE_HACKATHONS, RECEIVE_HACKATHONS_ERROR,
  REQUEST_ADD_USER_TO_HACKATHON, RECEIVE_ADD_USER_TO_HACKATHON,
  RECEIVE_ADD_USER_TO_HACKATHON_ERROR
} from 'actions'

export const hackathons = (state = {
  isFetching: false,
  caughtError: false,
  data: []
}, action) => {
  switch(action.type) {
    case REQUEST_HACKATHONS:
      return {
        isFetching: true,
        caughtError: false,
        data: []
      }
    case RECEIVE_HACKATHONS:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: false,
        data: action.hackathons
      })
    case RECEIVE_HACKATHONS_ERROR:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: true
      })
    case REQUEST_ADD_USER_TO_HACKATHON:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: false
      })
    case RECEIVE_ADD_USER_TO_HACKATHON:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: false,
        data: action.hackathons
      })
    case RECEIVE_ADD_USER_TO_HACKATHON_ERROR:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: true
      })
    default:
      return state
  }
}
