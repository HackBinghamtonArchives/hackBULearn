import {
  FETCH_HACKATHONS, SAVE_HACKATHON, CREATE_HACKATHON, DELETE_HACKATHON,
  EDIT_HACKATHON, EXIT_HACKATHON
} from 'actions/hackathonActions'

export const hackathons = (state = {
  isFetching: false,
  caughtError: false,
  message: null,
  error: null,
  data: {},
  cached: false,
  currentHackathon: null
}, action) => {
  // Clone old state
  const nextState = _.cloneDeep(state)

  // Mutate nextState according to the action type
  switch(action.type) {
    case FETCH_HACKATHONS:
      // Overwrite with new hackathons, except for cached hackathons
      if(action.hackathons) {
        _.mergeWith(nextState.data, action.hackathons, (o,n) => {
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
    case SAVE_HACKATHON:
      // Add new hackathon to existing hackathons, if it exists
      if(action.hackathon) {
        const hackathon = _.cloneDeep(action.hackathon)
        hackathon.cached = false
        nextState.data[hackathon._id] = hackathon
      }

      // Update status data
      _.assign(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        error: action.error
      })

      break
    case CREATE_HACKATHON:
      // Update status data
      _.assign(nextState, {
        isEditing: true,
        currentHackathon: null
      })

      break
    case EDIT_HACKATHON:
      // Update status data
      _.assign(nextState, {
        isEditing: true,
        currentHackathon: action.currentHackathon
      })

      break
    case EXIT_HACKATHON:
      // Update status data
      _.assign(nextState, {
        isEditing: false,
        currentHackathon: null
      })

      break
    case DELETE_HACKATHON:
      // Delete hackathon from loaded hackathon array
      if(action.hackathonId) delete nextState.data[action.hackathonId]

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
