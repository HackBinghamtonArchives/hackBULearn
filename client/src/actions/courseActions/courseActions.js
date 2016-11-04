import fetch from 'isomorphic-fetch'

export const REQUEST_COURSES = 'REQUEST_COURSES'
export const requestCourses = () => {
  return {
    type: REQUEST_COURSES
  }
}

export const RECEIVE_COURSES = 'RECEIVE_COURSES'
export const receiveCourses = (json) => {
  return {
    type: RECEIVE_COURSES,
    courses: json.courses
  }
}

export const RECEIVE_COURSES_ERROR = 'RECEIVE_COURSES_ERROR'
export const receiveCoursesError = (message) => {
  return {
    type: RECEIVE_COURSES_ERROR,
    message: message
  }
}

export const fetchCourses = (dispatch) => () => {
  dispatch(requestCourses)

  return fetch('/api/courses.json')
    .then(response => response.json())
    .then(json => dispatch(receiveCourses(json)))
    .catch((error) => dispatch(receiveCoursesError(error.message)))
}
