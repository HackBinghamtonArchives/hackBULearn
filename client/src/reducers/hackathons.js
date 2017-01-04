import {
  FETCH_HACKATHONS, SAVE_HACKATHON, CREATE_HACKATHON, DELETE_HACKATHON,
  CLEAR_NEW_HACKATHON
} from 'actions'

export const hackathons = (state = {
  isFetching: false,
  caughtError: false,
  data: {}
}, action) => {
  switch(action.type) {
    case FETCH_HACKATHONS:
      const data = _.merge(state.data, action.hackathons, (a, b) => {
        return (a.cached) ? a : b
      })

      return {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        data: data,
        cached: true
      }
    case SAVE_HACKATHON:
      if(action.hackathon) {
        action.hackathon.cached = true
        state.data[action.hackathon._id] = action.hackathon
      }

      return {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        data: _.omit(state.data, '-1'),
        cached: state.cached
      }
    case CREATE_HACKATHON:
      state.data[-1] = {
        _id: -1,
        title: '',
        description: '',
        thumbnail: ''
      }

      return {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        data: state.data,
        cached: state.cached
      }
    case DELETE_HACKATHON:
      if(action.hackathonId) delete state.data[action.hackathonId]

      return {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        data: state.data,
        cached: true
      }
    case CLEAR_NEW_HACKATHON:
      return {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        data: _.omit(state.data, '-1'),
        cached: state.cached
      }
    default:
      return state
  }
}
