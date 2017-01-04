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
    fetchHackathons: React.PropTypes.func.isRequired,
    createHackathon: React.PropTypes.func.isRequired,
    saveHackathon: React.PropTypes.func.isRequired,
    deleteHackathon: React.PropTypes.func.isRequired,
    users: React.PropTypes.object.isRequired,
    courses: React.PropTypes.object.isRequired,
    hackathons: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchUsers();
    this.props.fetchCourses();
    this.props.fetchHackathons();
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

  renderValidationErrors(store) {
    const errors = []

    if(store.caughtError) {
      if(store.error.errors) {
        _.values(store.error.errors).forEach((error) => {
          errors.push(
            <div className='alert alert-danger' key={error.message}>
              {error.message}
            </div>
          )
        })
      } else {
        errors.push(
          <div className='alert alert-danger' key='error'>
            {store.error.message}
          </div>
        )
      }
    }

    return errors
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
    if(this.props.courses.isFetching || _.isEmpty(this.props.courses.data)) {
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
        {this.renderValidationErrors(this.props.courses)}
        {rows}
        <div className={className.element('new_document_button')}
          onClick={this.props.createCourse}>
          New Course
        </div>
      </div>
    )
  }

  renderHackathonsView(className) {
    if(this.props.hackathons.isFetching || _.isEmpty(this.props.hackathons.data)) {
      return this.renderActivityIndicator(className)
    }

    const rows = _.values(this.props.hackathons.data).map((hackathon) => {
      const columns = {
        'Name': 'name',
        'Start Date': 'dates.start',
        'End Date': 'dates.end',
        'Facility': 'location.facility',
        'University': 'location.university',
        'Address': 'location.streetAddress',
        'City': 'location.city',
        'State': 'location.state',
        'Zip Code': 'location.zipCode',
        'Country': 'location.country',
        'Banner URL': 'bannerImage',
        'Website URL': 'websiteURL',
        'Registration URL': 'registrationURL',
        'Capacity': 'capacity'
      }

      return (
        <EditableDocument row={hackathon} columns={columns} key={hackathon._id}
          updateDocument={this.props.saveHackathon}
          deleteDocument={this.props.deleteHackathon} />
      )
    })

    return (
      <div className={className.element('course_table')}>
        {this.renderValidationErrors(this.props.hackathons)}
        {rows}
        <div className={className.element('new_document_button')}
          onClick={this.props.createHackathon}>
          New Hackathon
        </div>
      </div>
    )
  }

  render() {
    const administration = BEM('administration')
    const subviews = [
      'User Management',
      'Course Data',
      'Hackathons'
    ]

    return (
      <DashboardDetail title='Administration' icon='gears'>
        <SplitView subviews={subviews}>
          {this.renderUsersView(administration)}
          {this.renderCoursesView(administration)}
          {this.renderHackathonsView(administration)}
        </SplitView>
      </DashboardDetail>
    )
  }
}
