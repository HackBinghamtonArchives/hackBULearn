import { combineReducers } from 'redux'
import { courses } from './courses/courses'
import { course } from './course/course'

export default combineReducers({
  courses, course
})
