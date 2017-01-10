import React from 'react'
import _ from 'lodash'

import ActivityIndicator from 'components/ActivityIndicator'
import FormView from 'components/FormView'
import PopupView from 'components/PopupView'

import './style.scss'

export default class CourseEditor extends React.Component {
  static propTypes = {
    courses: React.PropTypes.object.isRequired,
    courseId: React.PropTypes.string.isRequired,
    onClose: React.PropTypes.func.isRequired,
    saveCourse: React.PropTypes.func.isRequired
  }

  state = {
    course: null,
    saved: true
  }

  componentWillMount() {
    const course = _.cloneDeep(this.props.courses.data[this.props.courseId])
    this.setState({ course })
  }

  constructor(props) {
    super(props)

    this.onEdit = this.onEdit.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onEdit(e) {
    var course = _.cloneDeep(this.state.course)
    _.set(course, e.target.name, e.target.value)
    this.setState({ course, saved: false })
  }

  onSave() {
    this.props.saveCourse(this.state.course)
  }

  render() {
    const activityIndicator = this.props.courses.isFetching && (
      <div className='course-editor__activity-indicator'>
        <ActivityIndicator />
      </div>
    )

    const form = !this.props.courses.isFetching && (
      <FormView
        data={ this.state.course }
        error={ this.props.courses.error }
        onChange={ this.onEdit }
        onSubmit={ this.onSave }
        disableSubmit={ this.state.saved } >
        <FormView.TextInput
          title='Title'
          name='title' />
        <FormView.TextInput
          title='Description'
          name='description' />
        <FormView.SelectInput
          title='Thumbnail'
          name='thumbnail'
          choices={ ['html', 'css', 'js'] } />
      </FormView>
    )

    return (
      <PopupView title='Edit Course' onClose={ this.props.onClose }>
        {activityIndicator}
        {form}
      </PopupView>
    )
  }
}
