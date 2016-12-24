import _ from 'lodash'
import {
  REQUEST_COURSES, RECEIVE_COURSES, RECEIVE_COURSES_ERROR
} from 'actions'

export const courses = (state = {
  isFetching: false,
  caughtError: false,
  data: []
}, action) => {
  switch(action.type) {
    case REQUEST_COURSES:
      return _.assign({}, state, {
        isFetching: true,
        caughtError: false
      })
    case RECEIVE_COURSES:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: false,
        data: action.courses
      })
    case RECEIVE_COURSES_ERROR:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: true
      })
    default:
      return state
  }
}
