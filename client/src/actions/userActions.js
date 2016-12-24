import fetch from 'isomorphic-fetch'

export const REQUEST_USER_INFO = 'REQUEST_USER_INFO'
export const requestUserInfo = () => {
  return {
    type: REQUEST_USER_INFO
  }
}

export const RECEIVE_USER_INFO = 'RECEIVE_USER_INFO'
export const receiveUserInfo = (json) => {
  return {
    type: RECEIVE_USER_INFO,
    user: json
  }
}

export const RECEIVE_USER_INFO_ERROR = 'RECEIVE_USER_INFO_ERROR'
export const receiveUserInfoError = (message) => {
  return {
    type: RECEIVE_USER_INFO_ERROR,
    message: message
  }
}

export const fetchUserInfo = (dispatch) => () => {
  dispatch(requestUserInfo())

  return fetch('/user/info', {
      'credentials': 'same-origin'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUserInfo(json)))
    .catch((error) => dispatch(receiveUserInfoError(error.message)))
}

export const REQUEST_ADD_VIDEO_TO_USER = 'REQUEST_ADD_VIDEO_TO_USER'
export const requestAddVideoToUser = () => {
  return {
    type: REQUEST_ADD_VIDEO_TO_USER
  }
}

export const RECEIVE_ADD_VIDEO_TO_USER = 'RECEIVE_ADD_VIDEO_TO_USER'
export const receiveAddVideoToUser = (json) => {
  return {
    type: RECEIVE_ADD_VIDEO_TO_USER,
    user: json
  }
}

export const RECEIVE_ADD_VIDEO_TO_USER_ERROR = 'RECEIVE_ADD_VIDEO_TO_USER_ERROR'
export const receiveAddVideoToUserError = (message) => {
  return {
    type: RECEIVE_ADD_VIDEO_TO_USER_ERROR,
    message: message
  }
}

export const addVideoToUser = (dispatch) => (id) => {
  dispatch(requestAddVideoToUser())

  return fetch('/user/videos/add/' + id, {
      credentials: 'same-origin',
      method: 'post'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveAddVideoToUser(json)))
    .catch((error) => dispatch(receiveAddVideoToUserError(error.message)))
}
