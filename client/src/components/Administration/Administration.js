import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'
import { DashboardDetail, ActivityIndicator, SplitView } from 'components'
import EditableDocument from './EditableDocument.js'

import './Administration.scss'

export default class Administration extends React.Component {
  static propTypes = {
    fetchUsers: React.PropTypes.func.isRequired,
    fetchCourses: React.PropTypes.func.isRequired,
    saveCourse: React.PropTypes.func.isRequired,
    deleteCourse: React.PropTypes.func.isRequired,
    createCourse: React.PropTypes.func.isRequired,
    saveUser: React.PropTypes.func.isRequired,
    deleteUser: React.PropTypes.func.isRequired,
    users: React.PropTypes.object.isRequired,
    courses: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchCourses();
  }

  constructor(props) {
    super(props)
  }

  renderActivityIndicator(className) {
    return (
      <div className={className.element('activity_indicator')}>
        <ActivityIndicator />
      </div>
    )
  }

  renderUsersView(className) {
    if(this.props.users.isFetching || this.props.users.caughtError || _.isEmpty(this.props.users.data)) {
      return this.renderActivityIndicator(className)
    }

    const rows = _.values(this.props.users.data).map((user) => {
      const columns = {
        'First Name': 'local.firstname',
        'Last Name': 'local.lastname',
        'Username': 'local.username',
        'Email': 'local.email',
        'Permission': 'permission'
      }

      return (
        <EditableDocument row={user} columns={columns} key={user._id}
          updateDocument={this.props.saveUser}
          deleteDocument={this.props.deleteUser}/>
      )
    })

    return (
      <div className={className.element('user_table')}>
        {rows}
      </div>
    )
  }

  renderCoursesView(className) {
    if(this.props.courses.isFetching || this.props.courses.caughtError || _.isEmpty(this.props.courses.data)) {
      return this.renderActivityIndicator(className)
    }

    const rows = _.values(this.props.courses.data).map((course) => {
      const columns = {
        'Title': 'title',
        'Description': 'description',
        'Thumbnail': 'thumbnail'
      }

      return (
        <EditableDocument row={course} columns={columns} key={course._id}
          updateDocument={this.props.saveCourse}
          deleteDocument={this.props.deleteCourse} />
      )
    })

    return (
      <div className={className.element('course_table')}>
        {rows}
        <div className={className.element('new_document_button')}
          onClick={this.props.createCourse}>
          New Course
        </div>
      </div>
    )
  }

  render() {
    const administration = BEM('administration')
    const subviews = [
      'User Management',
      'Course Data'
    ]

    return (
      <DashboardDetail title='Administration' icon='gears'>
        <SplitView subviews={subviews}>
          {this.renderUsersView(administration)}
          {this.renderCoursesView(administration)}
        </SplitView>
      </DashboardDetail>
    )
  }
}
