import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'

import ActivityIndicator from 'components/ActivityIndicator'
import CoursesEditor from 'components/CoursesEditor'
import DashboardDetail from 'components/DashboardDetail'
import EditableDocument from 'components/EditableDocument'
import HackathonsEditor from 'components/HackathonsEditor'
import SplitView from 'components/SplitView'
import UsersEditor from 'components/UsersEditor'

import './style.scss'

export default class Administration extends React.Component {
  static propTypes = {
    fetchUsers: React.PropTypes.func.isRequired,
    fetchCourses: React.PropTypes.func.isRequired,
    saveCourse: React.PropTypes.func.isRequired,
    deleteCourse: React.PropTypes.func.isRequired,
    createCourse: React.PropTypes.func.isRequired,
    saveUser: React.PropTypes.func.isRequired,
    deleteUser: React.PropTypes.func.isRequired,
    fetchHackathons: React.PropTypes.func.isRequired,
    createHackathon: React.PropTypes.func.isRequired,
    saveHackathon: React.PropTypes.func.isRequired,
    deleteHackathon: React.PropTypes.func.isRequired,
    users: React.PropTypes.object.isRequired,
    courses: React.PropTypes.object.isRequired,
    hackathons: React.PropTypes.object.isRequired
  }

  state = {
    selection: -1
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchHackathons();
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
          <UsersEditor
            fetchUsers={ this.props.fetchUsers }
            saveUser={ this.props.saveUser }
            deleteUser={ this.props.deleteUser }
            users={ this.props.users } />
          <CoursesEditor
            fetchCourses={ this.props.fetchCourses }
            createCourse={ this.props.createCourse }
            saveCourse={ this.props.saveCourse }
            deleteCourse={ this.props.deleteCourse }
            courses={ this.props.courses } />
          <HackathonsEditor
            fetchHackathons={ this.props.fetchHackathons }
            createHackathon={ this.props.createHackathon }
            saveHackathon={ this.props.saveHackathon }
            deleteHackathon={ this.props.deleteHackathon }
            hackathons={ this.props.hackathons } />
        </SplitView>
      </DashboardDetail>
    )
  }
}
