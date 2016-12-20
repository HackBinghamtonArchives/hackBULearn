import { combineReducers } from 'redux'
import { courses } from './courses/courses'
import { course } from './course/course'
import { user } from './user/user'

export default combineReducers({
  courses, course, user
})
