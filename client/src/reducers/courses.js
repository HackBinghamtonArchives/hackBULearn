import _ from 'lodash'
import {
  FETCH_COURSES, FETCH_COURSE, SAVE_COURSE, DELETE_COURSE,
  CREATE_COURSE, EDIT_COURSE, EXIT_COURSE
} from 'actions/courseActions'

export const courses = (state = {
  isFetching: false,
  caughtError: false,
  message: null,
  error: null,
  data: {},
  cached: false,
  currentCourse: null
}, action) => {
  // Clone old state
  const nextState = _.cloneDeep(state)

  // Mutate nextState according to the action type
  switch(action.type) {
    case FETCH_COURSES:
      // Overwrite with new courses, except for cached courses
      if(action.courses) {
        _.mergeWith(nextState.data, action.courses, (o,n) => {
          if(o && o.cached) return o
          return n
        })
      }

      // Update status data
      _.assign(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        error: action.error,
        cached: true
      })

      break
    case FETCH_COURSE:
      // Add fetched course to existing courses, if it exists
      if(action.course) {
        const course = _.cloneDeep(action.course)
        course.cached = true
        nextState.data[course._id] = course
      }

      // Update status data
      _.assign(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        error: action.error
      })

      break
    case SAVE_COURSE:
      // Add new course to existing courses, if it exists
      if(action.course) {
        const course = _.cloneDeep(action.course)
        course.cached = false
        nextState.data[course._id] = course
      }

      // Update status data
      _.assign(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        error: action.error
      })

      break
    case CREATE_COURSE:
      // Update status data
      _.assign(nextState, {
        isEditing: true,
        currentCourse: null,
        caughtError: false,
        message: null,
        error: null
      })

      break
    case EDIT_COURSE:
      // Update status data
      _.assign(nextState, {
        isEditing: true,
        currentCourse: action.currentCourse,
        caughtError: false,
        message: null,
        error: null
      })

      break
    case EXIT_COURSE:
      // Update status data
      _.assign(nextState, {
        isEditing: false,
        currentCourse: null,
        caughtError: false,
        message: null,
        error: null
      })

      break
    case DELETE_COURSE:
      // Delete course from loaded course array
      if(action.courseId) delete nextState.data[action.courseId]

      // Update status data
      _.assign(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        error: action.error,
        message: action.message
      })

      break
    default:
      // Do not mutate state
      break
  }

  // Return mutated state
  return nextState
}
