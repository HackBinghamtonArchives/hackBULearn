import fetch from 'isomorphic-fetch'

// ACTION: Fetch Hackathons
export const FETCH_HACKATHONS = 'FETCH_HACKATHONS'

const fetchingHackathons = () => {
  return {
    type: FETCH_HACKATHONS,
    isFetching: true,
    caughtError: false
  }
}

const fetchedHackathons = (hackathons) => {
  return {
    type: FETCH_HACKATHONS,
    isFetching: false,
    caughtError: false,
    hackathons: _.keyBy(hackathons, '_id')
  }
}

const caughtHackathonsError = (error) => {
  return {
    type: FETCH_HACKATHONS,
    isFetching: false,
    caughtError: true,
    error
  }
}

export const fetchHackathons = (dispatch) => () => {
  dispatch(fetchingHackathons())

  return fetch('/api/hackathons', {
      credentials: 'same-origin',
      method: 'get'
    })
    .then((response) => {
      if(response.ok) return response.json()
      response.json()
        .then(json => dispatch(caughtHackathonsError(json)))
    })
    .then(json => dispatch(fetchedHackathons(json)))
    .catch((error) => dispatch(caughtHackathonsError(error)))
}

// ACTION: Save hackathon
export const SAVE_HACKATHON = 'SAVE_HACKATHON'

const savingHackathon = () => {
  return {
    type: SAVE_HACKATHON,
    isFetching: true,
    caughtError: false
  }
}

const savedHackathon = (hackathon) => {
  return {
    type: SAVE_HACKATHON,
    isFetching: false,
    caughtError: false,
    hackathon
  }
}

export const saveHackathon = (dispatch) => (hackathon) => {
  dispatch(savingHackathon())

  const method = (hackathon._id == -1) ? 'POST' : 'PUT'
  const route = (hackathon._id == -1) ? '' : hackathon._id

  return fetch('/api/hackathons/' + route, {
      credentials: 'same-origin',
      method: method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hackathon)
    })
    .then((response) => {
      if(response.ok) return response.json()
      response.json()
        .then(json => dispatch(caughtHackathonsError(json)))
    })
    .then(json => dispatch(savedHackathon(json)))
    .catch((error) => dispatch(caughtHackathonsError(error)))
}

// ACTION: Delete hackathon
export const DELETE_HACKATHON = 'DELETE_HACKATHON'

const deletingHackathon = () => {
  return {
    type: DELETE_HACKATHON,
    isFetching: true,
    caughtError: false
  }
}

const deletedHackathon = (id) => {
  return {
    type: DELETE_HACKATHON,
    isFetching: false,
    caughtError: false,
    hackathonId: id
  }
}

export const deleteHackathon = (dispatch) => (hackathon) => {
  if(hackathon._id === -1) return dispatch(clearNewHackathon(hackathon))
  dispatch(deletingHackathon())

  return fetch('/api/hackathons/' + hackathon._id, {
      credentials: 'same-origin',
      method: 'delete',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(hackathon)
    })
    .then((response) => {
      if(response.ok) return response.json()
      response.json()
        .then(json => dispatch(caughtHackathonsError(json)))
    })
    .then(json => dispatch(deletedHackathon(hackathon._id)))
    .catch((error) => dispatch(caughtHackathonsError(error)))
}

// ACTION: Clear new hackathon
export const CLEAR_NEW_HACKATHON = 'CLEAR_NEW_HACKATHON'
const clearNewHackathon = (hackathon) => {
  return {
    type: CLEAR_NEW_HACKATHON,
    isFetching: false,
    caughtError: false
  }
}

// ACTION: Create hackathon
export const CREATE_HACKATHON = 'CREATE_HACKATHON'

export const createHackathon = (dispatch) => () => {
  dispatch({
    type: CREATE_HACKATHON,
    isFetching: false,
    caughtError: false
  })
}
