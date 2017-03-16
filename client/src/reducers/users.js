import _ from 'lodash';
import {
  FETCH_USERS, FETCH_USER, SAVE_USER, DELETE_USER,
  CREATE_USER, EDIT_USER, EXIT_USER,
} from 'actions/userActions';

export default (state = {
  isFetching: false,
  caughtError: false,
  message: null,
  error: null,
  data: {},
  cached: false,
  currentUser: null,
  me: null,
}, action) => {
  // Clone old state
  const nextState = _.cloneDeep(state);

  // Mutate nextState according to the action type
  switch (action.type) {
    case FETCH_USERS:
      // Overwrite with new users, except for cached users
      if (action.users) {
        _.mergeWith(nextState.data, action.users, (o, n) => {
          if (o && o.cached) return o;
          return n;
        });
      }

      // Update status data
      _.assign(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        error: action.error,
        cached: true,
      });

      break;
    case FETCH_USER:
      // Add fetched user to existing users, if it exists
      if (action.user) {
        const user = _.cloneDeep(action.user);
        user.cached = true;
        nextState.data[user._id] = user;

        // Check if the fetched user is the current user
        if (action.isMe) nextState.me = action.user._id;
      }

      // Update status data
      _.assign(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        error: action.error,
      });

      break;
    case SAVE_USER:
      // Add new user to existing users, if it exists
      if (action.user) {
        const user = _.cloneDeep(action.user);
        user.cached = false;
        nextState.data[user._id] = user;
      }

      // Update status data
      _.assign(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        message: action.message,
        error: action.error,
      });

      break;
    case CREATE_USER:
      // Update status data
      _.assign(nextState, {
        isEditing: true,
        currentUser: null,
        caughtError: false,
        message: null,
        error: null,
      });

      break;
    case EDIT_USER:
      // Update status data
      _.assign(nextState, {
        isEditing: true,
        currentUser: action.currentUser,
        caughtError: false,
        message: null,
        error: null,
      });

      break;
    case EXIT_USER:
      // Update status data
      _.assign(nextState, {
        isEditing: false,
        currentUser: null,
        caughtError: false,
        message: null,
        error: null,
      });

      break;
    case DELETE_USER:
      // Delete user from loaded user array
      if (action.userId) delete nextState.data[action.userId];

      // Update status data
      _.assign(nextState, {
        isFetching: action.isFetching,
        caughtError: action.caughtError,
        error: action.error,
        message: action.message,
      });

      break;
    default:
      // Do not mutate state
      break;
  }

  // Return mutated state
  return nextState;
};
