import fetch from 'isomorphic-fetch'

// ACTION: delete session
export const DELETE_SESSION = 'DELETE_SESSION'

const deletingSession = () => {
  return {
    type: DELETE_SESSION,
    isFetching: true,
    caughtError: false,
    didDelete: false
  }
}

const deletedSession = () => {
  return {
    type: DELETE_SESSION,
    isFetching: false,
    caughtError: false,
    didDelete: true
  }
}

const caughtSessionError = (error) => {
  return {
    type: DELETE_SESSION,
    isFetching: false,
    caughtError: true,
    didDelete: false,
    error
  }
}

export const deleteSession = (dispatch) => () => {
  dispatch(deletingSession())

  return fetch('/api/session', {
      credentials: 'same-origin',
      method: 'delete'
    })
    .then(response => response.json())
    .then(json => dispatch(deletedSession()))
    .catch((error) => dispatch(caughtSessionError(error)))
}
