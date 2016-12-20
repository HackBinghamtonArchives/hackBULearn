import {
  REQUEST_USER_INFO, RECEIVE_USER_INFO, RECEIVE_USER_INFO_ERROR,
  REQUEST_ADD_VIDEO_TO_USER, RECEIVE_ADD_VIDEO_TO_USER,
  RECEIVE_ADD_VIDEO_TO_USER_ERROR
} from 'actions'

export const user = (state = {
  isFetching: false,
  caughtError: false,
  data: {}
}, action) => {
  switch(action.type) {
    case REQUEST_USER_INFO:
      return {
        isFetching: true,
        caughtError: false,
        data: {}
      }
    case RECEIVE_USER_INFO:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: false,
        data: action.user
      })
    case RECEIVE_USER_INFO_ERROR:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: true
      })
    case REQUEST_ADD_VIDEO_TO_USER:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: false
      })
    case RECEIVE_ADD_VIDEO_TO_USER:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: false,
        data: action.user
      })
    case RECEIVE_ADD_VIDEO_TO_USER_ERROR:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: true
      })
    default:
      return state
  }
}
