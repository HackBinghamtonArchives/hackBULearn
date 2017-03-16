import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from 'reducers';
import thunkMiddleware from 'redux-thunk';

import DashboardMaster from 'components/DashboardMaster';
import Administration from 'components/Administration';
import Overview from 'components/Overview';

import Courses from 'containers/Courses';
import Course from 'containers/Course';
import Hackathons from 'containers/Hackathons';
import Settings from 'containers/Settings';

import './dashboard.scss';

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
const container = document.getElementById('dashboard-container');

ReactDOM.render(
  (
    <Provider store={store}>
      <Router>
        <DashboardMaster>
          <Route path="/dashboard/overview" component={Overview} />
          <Route path="/dashboard/courses" component={Courses} />
          <Route path="/dashboard/courses/:id" component={Course} />
          <Route path="/dashboard/hackathons" component={Hackathons} />
          <Route path="/dashboard/questions" component={Overview} />
          <Route path="/dashboard/admin" component={Administration} />
          <Route path="/dashboard/settings" component={Settings} />
        </DashboardMaster>
      </Router>
    </Provider>
  ),
  container,
);
