import React from 'react'

import ActivityIndicator from 'components/ActivityIndicator'
import CoursesList from 'containers/CoursesList'
import DashboardDetail from 'components/DashboardDetail'
import HackathonsList from 'containers/HackathonsList'
import SplitView from 'components/SplitView'
import UsersList from 'containers/UsersList'

import './style.scss'

export default class Administration extends React.Component {
  static propTypes = {}

  state = {
    selection: -1
  }

  constructor(props) {
    super(props)

    this.changeSelection = this.changeSelection.bind(this)
  }

  changeSelection(i) {
    this.setState({ selection: i })
  }

  render() {
    const subviews = [
      { title: 'User Management' },
      { title: 'Course Data' },
      { title: 'Hackathons' }
    ]

    return (
      <DashboardDetail title='Administration' icon='gears'>
        <SplitView
          subviews={ subviews }
          onChange={ this.changeSelection }
          activeView={ this.state.selection } >
          <UsersList />
          <CoursesList />
          <HackathonsList />
        </SplitView>
      </DashboardDetail>
    )
  }
}
