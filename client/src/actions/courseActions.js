import fetch from 'isomorphic-fetch'
import _ from 'lodash'

// ACTION: Fetch Courses
export const FETCH_COURSES = 'FETCH_COURSES'

const fetchingCourses = () => {
  return {
    type: FETCH_COURSES,
    isFetching: true,
    caughtError: false
  }
}

const fetchedCourses = (courses) => {
  return {
    type: FETCH_COURSES,
    isFetching: false,
    caughtError: false,
    courses: _.keyBy(courses, '_id')
  }
}

const caughtCoursesError = (message) => {
  return {
    type: FETCH_COURSES,
    isFetching: false,
    caughtError: true,
    message
  }
}

export const fetchCourses = (dispatch) => () => {
  dispatch(fetchingCourses())

  return fetch('/courses')
    .then(response => response.json())
    .then(json => dispatch(fetchedCourses(json)))
    .catch((error) => dispatch(caughtCoursesError(error.message)))
}

// ACTION: Fetch course
export const FETCH_COURSE = 'FETCH_COURSE'

const fetchingCourse = () => {
  return {
    type: FETCH_COURSE,
    isFetching: true,
    caughtError: false
  }
}

const fetchedCourse = (course) => {
  return {
    type: FETCH_COURSE,
    isFetching: false,
    caughtError: false,
    course
  }
}

const caughtCourseError = (message) => {
  return {
    type: FETCH_COURSE,
    isFetching: false,
    caughtError: true,
    message
  }
}

export const fetchCourse = (dispatch) => (id) => {
  dispatch(fetchingCourse())

  return fetch(`/courses/${id}`)
    .then(response => response.json())
    .then(json => dispatch(fetchedCourse(json)))
    .catch((error) => dispatch(caughtCourseError(error.message)))
}

// ACTION: Save course
export const SAVE_COURSE = 'SAVE_COURSE'

const savingCourse = () => {
  return {
    type: SAVE_COURSE,
    isFetching: true,
    caughtError: false
  }
}

const savedCourse = (course) => {
  return {
    type: SAVE_COURSE,
    isFetching: false,
    caughtError: false,
    course
  }
}

export const saveCourse = (dispatch) => (course) => {
  dispatch(savingCourse())

  const route = (course._id == -1) ? '/courses/create' : '/courses/update'
  return fetch(route, {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
    .then(response => response.json())
    .then(json => dispatch(savedCourse(json)))
    .catch((error) => dispatch(caughtCourseError(error.message)))
}

// ACTION: Delete course
export const DELETE_COURSE = 'DELETE_COURSE'

const deletingCourse = () => {
  return {
    type: DELETE_COURSE,
    isFetching: true,
    caughtError: false
  }
}

const deletedCourse = (courses) => {
  return {
    type: DELETE_COURSE,
    isFetching: false,
    caughtError: false,
    courses
  }
}

// ACTION: Clear new course
export const CLEAR_NEW_COURSE = 'CLEAR_NEW_COURSE'
const clearNewCourse = (course) => {
  return {
    type: CLEAR_NEW_COURSE,
    isFetching: false,
    caughtError: false
  }
}

export const deleteCourse = (dispatch) => (course) => {
  if(course._id === -1) return dispatch(clearNewCourse(course))
  dispatch(deletingCourse())

  return fetch('/courses/delete', {
      credentials: 'same-origin',
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
    .then(response => response.json())
    .then(json => dispatch(deletedCourse(json)))
    .catch((error) => dispatch(caughtCourseError(error.message)))
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
