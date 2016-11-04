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
      return _.merge({
        isFetching: true,
        caughtError: false
      }, state)
    case RECEIVE_COURSES:
      return _.merge({
        isFetching: false,
        caughtError: false,
        data: action.courses
      }, state)
    case RECEIVE_COURSES_ERROR:
      return _.merge({
        isFetching: false,
        caughtError: true
      }, state)
    default:
      return state
  }
}
