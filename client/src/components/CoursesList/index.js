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
    deleteCourse: React.PropTypes.func.isRequired,
    courses: React.PropTypes.object.isRequired
  }

  state = {
    isEditing: false,
    currentCourse: -1
  }

  componentDidMount() {
    this.props.fetchCourses()
  }

  constructor(props) {
    super(props)

    this.enableEditor = this.enableEditor.bind(this)
    this.disableEditor = this.disableEditor.bind(this)
  }

  enableEditor(id) {
    this.setState({
      isEditing: true,
      currentCourse: id
    })
  }

  disableEditor() {
    this.setState({
      isEditing: false,
      currentCourse: -1
    })
  }

  render () {
    const activityIndicator = this.props.courses.isFetching && (
      <div className='courses-list__activity-indicator'>
        <ActivityIndicator />
      </div>
    )

    const editorPopup = this.state.isEditing && (
      <CourseEditor
        courseId={ this.state.currentCourse }
        onClose={ this.disableEditor } />
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
        onEdit={ this.enableEditor } />
    )

    return (
      <div className='courses-list'>
        { activityIndicator }
        { editorPopup }
        { dataTable }
      </div>
    )
  }
}
