import { REQUEST_USERS, RECEIVE_USERS, RECEIVE_USERS_ERROR } from 'actions'

export const users = (state = {
  isFetching: false,
  caughtError: false,
  data: {}
}, action) => {
  switch(action.type) {
    case REQUEST_USERS:
      return {
        isFetching: true,
        caughtError: false,
        data: {}
      }
    case RECEIVE_USERS:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: false,
        data: action.users
      })
    case RECEIVE_USERS_ERROR:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: true
      })
    default:
      return state
  }
}
