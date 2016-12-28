import { combineReducers } from 'redux'
import { courses } from './courses'
import { course } from './course'
import { user } from './user'
import { users } from './users'
import { hackathons } from './hackathons'

export default combineReducers({
  courses, course, user, users, hackathons
})
