import { FETCH_USERS, SAVE_USER, DELETE_USER } from 'actions'

export const users = (state = {
  isFetching: false,
  caughtError: false,
  message: null,
  data: {}
}, action) => {
  switch(action.type) {
    case FETCH_USERS:
      return {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        data: action.users
      }
    case SAVE_USER:
      if(action.user) state.data[action.user._id] = action.user

      return {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        data: _.omit(state.data, '-1')
      }
    case DELETE_USER:
      return {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        data: action.users
      }
    default:
      return state
  }
}
