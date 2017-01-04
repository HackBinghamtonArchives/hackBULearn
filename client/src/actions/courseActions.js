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

const caughtCoursesError = (error) => {
  return {
    type: FETCH_COURSES,
    isFetching: false,
    caughtError: true,
    error
  }
}

export const fetchCourses = (dispatch) => () => {
  dispatch(fetchingCourses())

  return fetch('/api/courses', {
      credentials: 'same-origin',
      method: 'get'
    })
    .then(response => response.json())
    .then(json => dispatch(fetchedCourses(json)))
    .catch((error) => dispatch(caughtCoursesError(error)))
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

const caughtCourseError = (error) => {
  return {
    type: FETCH_COURSE,
    isFetching: false,
    caughtError: true,
    error
  }
}

export const fetchCourse = (dispatch) => (id) => {
  dispatch(fetchingCourse())

  return fetch(`/api/courses/${id}`, {
      credentials: 'same-origin',
      method: 'get'
    })
    .then((response) => {
      if(response.ok) return response.json()
      response.json()
        .then(json => dispatch(caughtCourseError(json)))
    })
    .then(json => dispatch(fetchedCourse(json)))
    .catch((error) => dispatch(caughtCourseError(error)))
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

  const method = (course._id == -1) ? 'POST' : 'PUT'
  const route = (course._id == -1) ? '' : course._id

  return fetch('/api/courses/' + route, {
      credentials: 'same-origin',
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
    .then((response) => {
      if(response.ok) return response.json()
      response.json()
        .then(json => dispatch(caughtCourseError(json)))
    })
    .then(json => dispatch(savedCourse(json)))
    .catch((error) => dispatch(caughtCourseError(error)))
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

const deletedCourse = (id) => {
  return {
    type: DELETE_COURSE,
    isFetching: false,
    caughtError: false,
    courseId: id
  }
}

export const deleteCourse = (dispatch) => (course) => {
  if(course._id === -1) return dispatch(clearNewCourse(course))
  dispatch(deletingCourse())

  return fetch('/api/courses/' + course._id, {
      credentials: 'same-origin',
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(course)
    })
    .then((response) => {
      if(response.ok) return response.json()
      response.json()
        .then(json => dispatch(caughtCourseError(json)))
    })
    .then(json => dispatch(deletedCourse(course._id)))
    .catch((error) => dispatch(caughtCourseError(error)))
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

// ACTION: Create course
export const CREATE_COURSE = 'CREATE_COURSE'

export const createCourse = (dispatch) => () => {
  dispatch({
    type: CREATE_COURSE,
    isFetching: false,
    caughtError: false
  })
}
