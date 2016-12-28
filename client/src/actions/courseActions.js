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
    courses: json
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
  dispatch(requestCourses())

  return fetch('/courses')
    .then(response => response.json())
    .then(json => dispatch(receiveCourses(json)))
    .catch((error) => dispatch(receiveCoursesError(error.message)))
}

export const REQUEST_COURSE = 'REQUEST_COURSE'
export const requestCourse = () => {
  return {
    type: REQUEST_COURSE
  }
}

export const RECEIVE_COURSE = 'RECEIVE_COURSE'
export const receiveCourse = (json) => {
  return {
    type: RECEIVE_COURSE,
    course: json
  }
}

export const RECEIVE_COURSE_ERROR = 'RECEIVE_COURSE_ERROR'
export const receiveCourseError = (message) => {
  return {
    type: RECEIVE_COURSE_ERROR,
    message: message
  }
}

export const fetchCourse = (dispatch) => (id) => {
  dispatch(requestCourse())

  return fetch('/courses/' + id)
    .then(response => response.json())
    .then(json => dispatch(receiveCourse(json)))
    .catch((error) => dispatch(receiveCourseError(error.message)))
}

export const REQUEST_UPDATED_COURSE = 'REQUEST_UPDATED_COURSE'
export const requestUpdatedCourse = () => {
  return {
    type: REQUEST_UPDATED_COURSE
  }
}

export const RECEIVE_UPDATED_COURSE = 'RECEIVE_UPDATED_COURSE'
export const receiveUpdatedCourse = (json) => {
  return {
    type: RECEIVE_UPDATED_COURSE,
    course: json
  }
}

export const RECEIVE_UPDATED_COURSE_ERROR = 'RECEIVE_UPDATED_COURSE_ERROR'
export const receiveUpdatedCourseError = (message) => {
  return {
    type: RECEIVE_UPDATED_COURSE_ERROR,
    message: message
  }
}

export const updateCourse = (dispatch) => (data) => {
  dispatch(requestUpdatedCourse())

  return fetch('/courses/update', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUpdatedCourse(json)))
    .catch((error) => dispatch(receiveUpdatedCourseError(error.message)))
}

export const REQUEST_DELETED_COURSE = 'REQUEST_DELETED_COURSE'
export const requestDeletedCourse = () => {
  return {
    type: REQUEST_DELETED_COURSE
  }
}

export const deleteCourse = (dispatch) => (data) => {
  dispatch(requestDeletedCourse())

  return fetch('/courses/delete', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(json => dispatch(receiveCourses(json)))
    .catch((error) => dispatch(receiveCoursesError(error.message)))
}
