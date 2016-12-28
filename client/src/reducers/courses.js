import _ from 'lodash'
import {
  REQUEST_COURSES, RECEIVE_COURSES, RECEIVE_COURSES_ERROR, REQUEST_DELETED_COURSE,
  REQUEST_UPDATED_COURSE, RECEIVE_UPDATED_COURSE, RECEIVE_UPDATED_COURSE_ERROR
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
    case REQUEST_UPDATED_COURSE:
      return {
        isFetching: true,
        caughtError: false,
        data: state.data
      }
    case RECEIVE_UPDATED_COURSE:
      const data = state.data.map((course) => {
        if(course._id == action.course._id) return action.course
        return course
      })

      return _.assign({}, state, {
        isFetching: false,
        caughtError: false,
        data: data
      })
    case RECEIVE_UPDATED_COURSE_ERROR:
      return _.assign({}, state, {
        isFetching: false,
        caughtError: true
      })
    case REQUEST_DELETED_COURSE:
      return {
        isFetching: true,
        caughtError: false,
        data: state.data
      }
    default:
      return state
  }
}
