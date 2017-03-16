import _ from 'lodash';

export default (state = {
  isFetching: false,
  caughtError: false,
  error: null,
  didDelete: false,
}, action) => {
  // Clone old state
  const nextState = _.cloneDeep(state);

  // Mutate nextState
  _.assign(nextState, {
    isFetching: action.isFetching,
    caughtError: action.caughtError,
    error: action.error,
    didDelete: action.didDelete,
  });

  // Return mutated state
  return nextState;
};
