import fetch from 'isomorphic-fetch';

// ACTION: delete session
export const DELETE_SESSION = 'DELETE_SESSION';

const deletingSession = () => ({
  type: DELETE_SESSION,
  isFetching: true,
  caughtError: false,
  didDelete: false,
});

const deletedSession = () => ({
  type: DELETE_SESSION,
  isFetching: false,
  caughtError: false,
  didDelete: true,
});

const caughtSessionError = error => ({
  type: DELETE_SESSION,
  isFetching: false,
  caughtError: true,
  didDelete: false,
  error,
});

export const deleteSession = dispatch => () => {
  dispatch(deletingSession());

  return fetch('/api/session', {
    credentials: 'same-origin',
    method: 'delete',
  }).then(response => response.json())
    .then(() => dispatch(deletedSession()))
    .catch(error => dispatch(caughtSessionError(error)));
};
