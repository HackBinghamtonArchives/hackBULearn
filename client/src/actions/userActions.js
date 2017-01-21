import fetch from 'isomorphic-fetch'
import _ from 'lodash'

// ACTION: Fetch Users
export const FETCH_USERS = 'FETCH_USERS'

const fetchingUsers = () => {
  return {
    type: FETCH_USERS,
    isFetching: true,
    caughtError: false
  }
}

const fetchedUsers = (users) => {
  return {
    type: FETCH_USERS,
    isFetching: false,
    caughtError: false,
    users: _.keyBy(users, '_id')
  }
}

const caughtUsersError = (error) => {
  return {
    type: FETCH_USERS,
    isFetching: false,
    caughtError: true,
    error
  }
}

export const fetchUsers = (dispatch) => () => {
  dispatch(fetchingUsers())

  return fetch('/api/users', {
      credentials: 'same-origin',
      method: 'get'
    })
    .then(response => response.json())
    .then(json => dispatch(fetchedUsers(json)))
    .catch((error) => dispatch(caughtUsersError(error)))
}

// ACTION: Fetch user
export const FETCH_USER = 'FETCH_USER'

const fetchingUser = () => {
  return {
    type: FETCH_USER,
    isFetching: true,
    caughtError: false
  }
}

const fetchedUser = (user, isMe) => {
  return {
    type: FETCH_USER,
    isFetching: false,
    caughtError: false,
    user,
    isMe
  }
}

const caughtUserError = (error) => {
  return {
    type: FETCH_USER,
    isFetching: false,
    caughtError: true,
    error
  }
}

export const fetchUser = (dispatch) => (id) => {
  dispatch(fetchingUser())

  return fetch(`/api/users/${id}`, {
      credentials: 'same-origin',
      method: 'get'
    })
    .then((response) => {
      if(response.ok) return response.json()
      response.json()
        .then(json => dispatch(caughtUserError(json)))
    })
    .then(json => {
      const isMe = (id === 'me')
      dispatch(fetchedUser(json, isMe))
    })
    .catch((error) => dispatch(caughtUserError(error)))
}

// ACTION: Save user
export const SAVE_USER = 'SAVE_USER'

const savingUser = () => {
  return {
    type: SAVE_USER,
    isFetching: true,
    caughtError: false
  }
}

const savedUser = (user) => {
  return {
    type: SAVE_USER,
    isFetching: false,
    caughtError: false,
    message: 'This user was saved successfully.',
    user
  }
}

export const saveUser = (dispatch) => (user) => {
  dispatch(savingUser())

  const method = (user._id) ? 'PUT' : 'POST'
  const route = (user._id) ? user._id : ''

  return fetch('/api/users/' + route, {
      credentials: 'same-origin',
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((response) => {
      if(response.ok) return response.json()
      response.json()
        .then(json => dispatch(caughtUserError(json)))
    })
    .then(json => dispatch(savedUser(json)))
    .catch((error) => dispatch(caughtUserError(error)))
}

// ACTION: Delete user
export const DELETE_USER = 'DELETE_USER'

const deletingUser = () => {
  return {
    type: DELETE_USER,
    isFetching: true,
    caughtError: false
  }
}

const deletedUser = (id) => {
  return {
    type: DELETE_USER,
    isFetching: false,
    caughtError: false,
    message: 'This user was deleted successfully.',
    userId: id
  }
}

export const deleteUser = (dispatch) => (user) => {
  dispatch(deletingUser())

  return fetch('/api/users/' + user._id, {
      credentials: 'same-origin',
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then((response) => {
      if(response.ok) return response.json()
      response.json()
        .then(json => dispatch(caughtUserError(json)))
    })
    .then(json => dispatch(deletedUser(user._id)))
    .catch((error) => dispatch(caughtUserError(error)))
}

// ACTION: Edit existing user
export const EDIT_USER = 'EDIT_USER'

export const editUser = (dispatch) => (id) => {
  dispatch({
    type: EDIT_USER,
    currentUser: id
  })
}

// ACTION: Exit user editor
export const EXIT_USER = 'EXIT_USER'

export const exitUser = (dispatch) => () => {
  dispatch({
    type: EXIT_USER
  })
}

// ACTION: Create new user
export const CREATE_USER = 'CREATE_USER'

export const createUser = (dispatch) => () => {
  dispatch({
    type: CREATE_USER
  })
}
