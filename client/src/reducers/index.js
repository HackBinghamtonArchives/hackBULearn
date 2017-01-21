import { combineReducers } from 'redux'
import { courses } from './courses'
import { users } from './users'
import { hackathons } from './hackathons'
import { session } from './session'

export default combineReducers({
  courses, users, hackathons, session
})
