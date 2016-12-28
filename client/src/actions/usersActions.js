import fetch from 'isomorphic-fetch'

export const REQUEST_USERS = 'REQUEST_USERS'
export const requestUsers = () => {
  return {
    type: REQUEST_USERS
  }
}

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const receiveUsers = (json) => {
  return {
    type: RECEIVE_USERS,
    users: json
  }
}

export const RECEIVE_USERS_ERROR = 'RECEIVE_USERS_ERROR'
export const receiveUsersError = (message) => {
  return {
    type: RECEIVE_USERS_ERROR,
    message: message
  }
}

export const fetchUsers = (dispatch) => () => {
  dispatch(requestUsers())

  return fetch('/users', {
      'credentials': 'same-origin'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUsers(json)))
    .catch((error) => dispatch(receiveUsersMessage(error.message)))
}
