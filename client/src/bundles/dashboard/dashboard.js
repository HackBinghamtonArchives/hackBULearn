import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from 'react-router'
import { Route } from 'react-router'
import { IndexRedirect } from 'react-router'
import { browserHistory } from 'react-router'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware,  } from 'redux'
import reducers from 'reducers'
import thunkMiddleware from 'redux-thunk'
const store = createStore(reducers, applyMiddleware(thunkMiddleware))

import { DashboardLayout, OverviewLayout, CourseLayout,
         AchievementLayout } from 'components'

import { CoursesLayout } from 'containers'

import "./dashboard.scss"

const container = document.getElementById('dashboard_container')

ReactDOM.render(
  (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path='/dashboard' component={DashboardLayout}>
          <IndexRedirect to='overview' />
          <Route path='overview' component={OverviewLayout} />
          <Route path='courses' component={CoursesLayout} />
          <Route path='course/:id' component={CourseLayout} />
          <Route path='achievements' component={AchievementLayout} />
          <Route path='questions' component={OverviewLayout} />
        </Route>
      </Router>
    </Provider>
  ),
  container
)
