import fetch from 'isomorphic-fetch';
import _ from 'lodash';

// ACTION: Fetch Hackathons
export const FETCH_HACKATHONS = 'FETCH_HACKATHONS';

const fetchingHackathons = () => ({
  type: FETCH_HACKATHONS,
  isFetching: true,
  caughtError: false,
});

const fetchedHackathons = hackathons => ({
  type: FETCH_HACKATHONS,
  isFetching: false,
  caughtError: false,
  hackathons: _.keyBy(hackathons, '_id'),
});

const caughtHackathonsError = error => ({
  type: FETCH_HACKATHONS,
  isFetching: false,
  caughtError: true,
  error,
});

export const fetchHackathons = dispatch => () => {
  dispatch(fetchingHackathons());

  return fetch('/api/hackathons', {
    credentials: 'same-origin',
    method: 'get',
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json()
      .then(json => dispatch(caughtHackathonsError(json)));
  }).then(json => dispatch(fetchedHackathons(json)))
    .catch(error => dispatch(caughtHackathonsError(error)));
};

// ACTION: Save hackathon
export const SAVE_HACKATHON = 'SAVE_HACKATHON';

const savingHackathon = () => ({
  type: SAVE_HACKATHON,
  isFetching: true,
  caughtError: false,
});

const savedHackathon = hackathon => ({
  type: SAVE_HACKATHON,
  isFetching: false,
  caughtError: false,
  message: 'This hackathon was saved successfully.',
  hackathon,
});

export const saveHackathon = dispatch => (hackathon) => {
  dispatch(savingHackathon());

  const method = (hackathon._id) ? 'PUT' : 'POST';
  const route = (hackathon._id) ? hackathon._id : '';

  return fetch(`/api/hackathons/${route}`, {
    credentials: 'same-origin',
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hackathon),
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json()
      .then(json => dispatch(caughtHackathonsError(json)));
  }).then(json => dispatch(savedHackathon(json)))
    .catch(error => dispatch(caughtHackathonsError(error)));
};

// ACTION: Delete hackathon
export const DELETE_HACKATHON = 'DELETE_HACKATHON';

const deletingHackathon = () => ({
  type: DELETE_HACKATHON,
  isFetching: true,
  caughtError: false,
});

const deletedHackathon = id => ({
  type: DELETE_HACKATHON,
  isFetching: false,
  caughtError: false,
  message: 'This hackathon was deleted successfully.',
  hackathonId: id,
});

export const deleteHackathon = dispatch => (hackathon) => {
  if (hackathon._id === -1) return dispatch(clearNewHackathon(hackathon));
  dispatch(deletingHackathon());

  return fetch(`/api/hackathons/${hackathon._id}`, {
    credentials: 'same-origin',
    method: 'delete',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(hackathon),
  }).then((response) => {
    if (response.ok) return response.json();
    return response.json()
      .then(json => dispatch(caughtHackathonsError(json)));
  }).then(() => dispatch(deletedHackathon(hackathon._id)))
    .catch(error => dispatch(caughtHackathonsError(error)));
};

// ACTION: Edit existing hackathon
export const EDIT_HACKATHON = 'EDIT_HACKATHON';

export const editHackathon = dispatch => (id) => {
  dispatch({
    type: EDIT_HACKATHON,
    currentHackathon: id,
  });
};

// ACTION: Exit hackathon editor
export const EXIT_HACKATHON = 'EXIT_HACKATHON';

export const exitHackathon = dispatch => () => {
  dispatch({
    type: EXIT_HACKATHON,
  });
};

// ACTION: Create new hackathon
export const CREATE_HACKATHON = 'CREATE_HACKATHON';

export const createHackathon = dispatch => () => {
  dispatch({
    type: CREATE_HACKATHON,
  });
};
