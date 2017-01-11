import React from 'react'
import _ from 'lodash'

import ActivityIndicator from 'components/ActivityIndicator'
import DataView from 'components/DataView'
import CourseEditor from 'containers/CourseEditor'

import './style.scss'

export default class CoursesList extends React.Component {
  static propTypes = {
    fetchCourses: React.PropTypes.func.isRequired,
    createCourse: React.PropTypes.func.isRequired,
    editCourse: React.PropTypes.func.isRequired,
    deleteCourse: React.PropTypes.func.isRequired,
    courses: React.PropTypes.object.isRequired
  }

  state = {}

  componentDidMount() {
    this.props.fetchCourses()
  }

  constructor(props) {
    super(props)

    this.deleteCourse = this.deleteCourse.bind(this)
  }

  deleteCourse(id) {
    this.props.deleteCourse({ _id: id })
  }

  render () {
    const activityIndicator = this.props.courses.isFetching && (
      <div className='courses-list__activity-indicator'>
        <ActivityIndicator />
      </div>
    )

    const editorPopup = this.props.courses.isEditing && (
      <CourseEditor />
    )

    const columns = ['Course', 'Description', 'Videos']

    const data = _.mapValues(this.props.courses.data, (course) => {
      return [
        course.title,
        course.description,
        course.videos.length
      ]
    })

    const dataTable = (
      <DataView
        columns={ columns }
        data={ data }
        onEdit={ this.props.editCourse }
        onDelete={ this.deleteCourse } />
    )

    const newCourseButton = !this.props.courses.isEditing && (
      <div
        className='courses-list__new-course-button'
        onClick={ this.props.createCourse }>
        New Course
      </div>
    )

    return (
      <div className='courses-list'>
        { activityIndicator }
        { editorPopup }
        { dataTable }
        { newCourseButton }
      </div>
    )
  }
}
