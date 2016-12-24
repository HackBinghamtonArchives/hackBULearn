import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from 'react-router'
import { Route } from 'react-router'
import { IndexRedirect } from 'react-router'
import { browserHistory } from 'react-router'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reducers from 'reducers'
import thunkMiddleware from 'redux-thunk'
const store = createStore(reducers, applyMiddleware(thunkMiddleware))

import { DashboardMaster } from 'components'

import { Courses, Course, Overview, Hackathons } from 'containers'

import "./dashboard.scss"

const container = document.getElementById('dashboard_container')

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/dashboard' component={DashboardMaster}>
          <IndexRedirect to='overview' />
          <Route path='overview' component={Overview} />
          <Route path='courses' component={Courses} />
          <Route path='courses/:id' component={Course} />
          <Route path='hackathons' component={Hackathons} />
          <Route path='questions' component={Overview} />
        </Route>
      </Router>
    </Provider>
  ),
  container
)
