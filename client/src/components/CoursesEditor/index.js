import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'

import ActivityIndicator from 'components/ActivityIndicator'
import EditableDocument from 'components/EditableDocument'

import './style.scss'

export default class CoursesEditor extends React.Component {
  static propTypes = {
    fetchCourses: React.PropTypes.func.isRequired,
    createCourse: React.PropTypes.func.isRequired,
    saveCourse: React.PropTypes.func.isRequired,
    deleteCourse: React.PropTypes.func.isRequired,
    courses: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchCourses()
  }

  constructor(props) {
    super(props)
  }

  renderActivityIndicator(className) {
    if(this.props.courses.isFetching) {
      return (
        <div className={className.element('activity_indicator')}>
          <ActivityIndicator />
        </div>
      )
    }
  }

  renderValidationErrors() {
    if(this.props.courses.caughtError) {
      const errors = []

      if(this.props.courses.error.errors) {
        _.values(this.props.courses.error.errors).forEach((error) => {
          errors.push(
            <div className='alert alert-danger' key={error.message}>
              {error.message}
            </div>
          )
        })
      } else {
        errors.push(
          <div className='alert alert-danger' key='error'>
            {this.props.courses.error.message}
          </div>
        )
      }

      return errors
    }
  }

  renderRows(className) {
    if(!this.props.courses.isFetching) {
      return _.values(this.props.courses.data).map((course) => {
        const columns = {
          'Title': {
            key: 'title',
            type: 'text'
          },
          'Description': {
            key: 'description',
            type: 'text'
          },
          'Thumbnail': {
            key: 'thumbnail',
            type: 'text'
          }
        }

        return (
          <EditableDocument row={course} columns={columns} key={course._id}
            updateDocument={this.props.saveCourse}
            deleteDocument={this.props.deleteCourse} />
        )
      })
    }
  }

  renderNewDocumentButton(className) {
    if(!this.props.courses.isFetching) {
      return (
        <div className={className.element('new_document_button')}
          onClick={this.props.createCourse}>
          New Course
        </div>
      )
    }
  }

  render() {
    const courses_editor = BEM('courses_editor')

    return (
      <div className={courses_editor}>
        {this.renderActivityIndicator(courses_editor)}
        {this.renderValidationErrors()}
        {this.renderRows(courses_editor)}
        {this.renderNewDocumentButton(courses_editor)}
      </div>
    )
  }
}
