import fetch from 'isomorphic-fetch'
import _ from 'lodash'

// ACTION: Fetch users
export const FETCH_USERS = 'FETCH_USERS'

export const fetchingUsers = () => {
  return {
    type: FETCH_USERS,
    isFetching: true,
    caughtError: false
  }
}

export const fetchedUsers = (users) => {
  return {
    type: FETCH_USERS,
    isFetching: false,
    caughtError: false,
    users: _.keyBy(users, '_id')
  }
}

export const caughtUsersError = (message) => {
  return {
    type: FETCH_USERS,
    isFetching: false,
    caughtError: true,
    message
  }
}

export const fetchUsers = (dispatch) => () => {
  dispatch(fetchingUsers())

  return fetch('/users', {
      'credentials': 'same-origin'
    })
    .then(response => response.json())
    .then(json => dispatch(fetchedUsers(json)))
    .catch((error) => dispatch(caughtUsersError(error.message)))
}

// ACTION: Save course
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
    user
  }
}

export const saveUser = (dispatch) => (user) => {
  dispatch(savingUser())

  const route = (user._id == -1) ? '/user/create' : '/user/update'
  return fetch(route, {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(json => dispatch(savedUser(json)))
    .catch((error) => dispatch(caughtUsersError(error.message)))
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

const deletedUser = (users) => {
  return {
    type: DELETE_USER,
    isFetching: false,
    caughtError: false,
    users
  }
}

export const deleteUser = (dispatch) => (user) => {
  if(user._id === -1) return
  dispatch(deletingUser())

  return fetch('/user/delete', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(response => {
      if(response.status >= 200 && response.status < 300) return response
      throw new Error(JSON.stringify(response))
    })
    .then(response => response.json())
    .then(json => dispatch(deletedUser(json)))
    .catch((error) => dispatch(caughtUsersError(error.message)))
}

// ACTION: Create course
export const CREATE_COURSE = 'CREATE_COURSE'

export const createCourse = (dispatch) => () => {
  dispatch({
    type: CREATE_COURSE,
    isFetching: false,
    caughtError: false
  })
}
