import React from 'react'
import ReactDOM from 'react-dom'

import { Router } from 'react-router'
import { Route } from 'react-router'
import { IndexRedirect } from 'react-router'
import { browserHistory } from 'react-router'

import { DashboardLayout } from 'components'
import { OverviewLayout } from 'components'

import "./dashboard.scss"

const container = document.getElementById('dashboard_container')

ReactDOM.render(
  (
    <Router history={browserHistory}>
      <Route path='/dashboard' component={DashboardLayout}>
        <IndexRedirect to='overview' />
        <Route path='overview' component={OverviewLayout} />
        <Route path='courses' component={OverviewLayout} />
        <Route path='achievements' component={OverviewLayout} />
        <Route path='questions' component={OverviewLayout} />
      </Route>
    </Router>
  ),
  container
)
