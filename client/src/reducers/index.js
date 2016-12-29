import { combineReducers } from 'redux'
import { courses } from './courses'
import { user } from './user'
import { users } from './users'
import { hackathons } from './hackathons'

export default combineReducers({
  courses, user, users, hackathons
})
