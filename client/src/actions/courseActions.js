import fetch from 'isomorphic-fetch';
import _ from 'lodash';

// ACTION: Fetch Courses
export const FETCH_COURSES = 'FETCH_COURSES';

const fetchingCourses = () => ({
  type: FETCH_COURSES,
  isFetching: true,
  caughtError: false,
});

const fetchedCourses = courses => ({
  type: FETCH_COURSES,
  isFetching: false,
  caughtError: false,
  courses: _.keyBy(courses, '_id'),
});

const caughtCoursesError = error => ({
  type: FETCH_COURSES,
  isFetching: false,
  caughtError: true,
  error,
});

export const fetchCourses = dispatch => () => {
  dispatch(fetchingCourses());

  return fetch('/api/courses', {
    credentials: 'same-origin',
    method: 'get',
  }).then(response => response.json())
    .then(json => dispatch(fetchedCourses(json)))
    .catch(error => dispatch(caughtCoursesError(error)));
};

// ACTION: Fetch course
export const FETCH_COURSE = 'FETCH_COURSE';

const fetchingCourse = () => ({
  type: FETCH_COURSE,
  isFetching: true,
  caughtError: false,
});

const fetchedCourse = course => ({
  type: FETCH_COURSE,
  isFetching: false,
  caughtError: false,
  course,
});

const caughtCourseError = error => ({
  type: FETCH_COURSE,
  isFetching: false,
  caughtError: true,
  error,
});

export const fetchCourse = dispatch => (id) => {
  dispatch(fetchingCourse());

  return fetch(`/api/courses/${id}`, {
    credentials: 'same-origin',
    method: 'get',
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json()
      .then(json => dispatch(caughtCourseError(json)));
  }).then(json => dispatch(fetchedCourse(json)))
    .catch(error => dispatch(caughtCourseError(error)));
};

// ACTION: Save course
export const SAVE_COURSE = 'SAVE_COURSE';

const savingCourse = () => ({
  type: SAVE_COURSE,
  isFetching: true,
  caughtError: false,
});

const savedCourse = course => ({
  type: SAVE_COURSE,
  isFetching: false,
  caughtError: false,
  message: 'This course was saved successfully.',
  course,
});

export const saveCourse = dispatch => (course) => {
  dispatch(savingCourse());

  const method = (course._id) ? 'PUT' : 'POST';
  const route = (course._id) ? course._id : '';

  return fetch(`/api/courses/${route}`, {
    credentials: 'same-origin',
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json()
      .then(json => dispatch(caughtCourseError(json)));
  }).then(json => dispatch(savedCourse(json)))
    .catch(error => dispatch(caughtCourseError(error)));
};

// ACTION: Delete course
export const DELETE_COURSE = 'DELETE_COURSE';

const deletingCourse = () => ({
  type: DELETE_COURSE,
  isFetching: true,
  caughtError: false,
});

const deletedCourse = id => ({
  type: DELETE_COURSE,
  isFetching: false,
  caughtError: false,
  message: 'This course was deleted successfully.',
  courseId: id,
});

export const deleteCourse = dispatch => (course) => {
  dispatch(deletingCourse());

  return fetch(`/api/courses/${course._id}`, {
    credentials: 'same-origin',
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(course),
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json()
      .then(json => dispatch(caughtCourseError(json)));
  })
  .then(() => dispatch(deletedCourse(course._id)))
  .catch(error => dispatch(caughtCourseError(error)));
};

// ACTION: Edit existing course
export const EDIT_COURSE = 'EDIT_COURSE';

export const editCourse = dispatch => (id) => {
  dispatch({
    type: EDIT_COURSE,
    currentCourse: id,
  });
};

// ACTION: Exit course editor
export const EXIT_COURSE = 'EXIT_COURSE';

export const exitCourse = dispatch => () => {
  dispatch({
    type: EXIT_COURSE,
  });
};

// ACTION: Create new course
export const CREATE_COURSE = 'CREATE_COURSE';

export const createCourse = dispatch => () => {
  dispatch({
    type: CREATE_COURSE,
  });
};
