import fetch from 'isomorphic-fetch'

export const REQUEST_HACKATHONS = 'REQUEST_HACKATHONS'
export const requestHackathons = () => {
  return {
    type: REQUEST_HACKATHONS
  }
}

export const RECEIVE_HACKATHONS = 'RECEIVE_HACKATHONS'
export const receiveHackathons = (json) => {
  return {
    type: RECEIVE_HACKATHONS,
    hackathons: json
  }
}

export const RECEIVE_HACKATHONS_ERROR = 'RECEIVE_HACKATHONS_ERROR'
export const receiveHackathonsError = (message) => {
  return {
    type: RECEIVE_HACKATHONS_ERROR,
    message: message
  }
}

export const fetchHackathons = (dispatch) => () => {
  dispatch(requestHackathons())

  return fetch('/hackathons')
    .then(response => response.json())
    .then(json => dispatch(receiveHackathons(json)))
    .catch((error) => dispatch(receiveHackathonsError(error.message)))
}

export const REQUEST_ADD_USER_TO_HACKATHON = 'REQUEST_ADD_USER_TO_HACKATHON'
export const requestAddUserToHackathon = () => {
  return {
    type: REQUEST_ADD_USER_TO_HACKATHON
  }
}

export const RECEIVE_ADD_USER_TO_HACKATHON = 'RECEIVE_ADD_USER_TO_HACKATHON'
export const receiveAddUserToHackathon = (json) => {
  return {
    type: RECEIVE_ADD_USER_TO_HACKATHON,
    hackathons: json
  }
}

export const RECEIVE_ADD_USER_TO_HACKATHON_ERROR = 'RECEIVE_ADD_USER_TO_HACKATHON_ERROR'
export const receiveAddUserToHackathonError = (message) => {
  return {
    type: RECEIVE_ADD_USER_TO_HACKATHON_ERROR,
    message: message
  }
}

export const addUserToHackathon = (dispatch) => (id) => {
  dispatch(requestAddUserToHackathon())

  return fetch('/hackathons/' + id + '/register', {
      credentials: 'same-origin',
      method: 'post'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveAddUserToHackathon(json)))
    .catch((error) => dispatch(receiveAddUserToHackathonError(error.message)))
}

export const REQUEST_CREATE_HACKATHON = 'REQUEST_CREATE_HACKATHON'
export const requestCreateHackathon = () => {
  return {
    type: REQUEST_CREATE_HACKATHON
  }
}

export const RECEIVE_CREATE_HACKATHON = 'RECEIVE_CREATE_HACKATHON'
export const receiveCreateHackathon = (json) => {
  return {
    type: RECEIVE_CREATE_HACKATHON,
    hackathons: json
  }
}

export const RECEIVE_CREATE_HACKATHON_ERROR = 'RECEIVE_CREATE_HACKATHON_ERROR'
export const receiveCreateHackathonError = (message) => {
  return {
    type: RECEIVE_CREATE_HACKATHON_ERROR,
    message: message
  }
}

export const createHackathon = (dispatch) => () => {
  dispatch(requestCreateHackathon())

  return fetch('/hackathons/create', {
      credentials: 'same-origin',
      method: 'post'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveCreateHackathon(json)))
    .catch((error) => dispatch(receiveCreateHackathonError(error.message)))
}
