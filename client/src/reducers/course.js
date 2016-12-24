import _ from 'lodash'
import {
  REQUEST_COURSE, RECEIVE_COURSE, RECEIVE_COURSE_ERROR
} from 'actions'

export const course = (state = {
  isFetching: false,
  caughtError: false,
  data: {}
}, action) => {
  switch(action.type) {
    case REQUEST_COURSE:
      return {
        isFetching: true,
        caughtError: false,
        data: {}
      }
    case RECEIVE_COURSE:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: false,
        data: action.course
      })
    case RECEIVE_COURSE_ERROR:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: true
      })
    default:
      return state
  }
}
