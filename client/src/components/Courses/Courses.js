import React from 'react'
import { block as BEM } from 'bem-class'
import { CourseThumbnail, DashboardDetail, ActivityIndicator } from 'components'

import './Courses.scss'

export default class Courses extends React.Component {
  static propTypes = {
    courses: React.PropTypes.object.isRequired,
    fetchCourses: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(this.props.courses.data.length == 0) this.props.fetchCourses()
  }

  renderTiles() {
    return _.map(this.props.courses.data, (course) => {
      return (
        <CourseThumbnail title={course.title}
          key={course._id}
          course_id={course._id}
          description={course.description} />
      )
    })
  }

  renderActivityIndicator(className) {
    if(this.props.courses.data.length == 0) {
      return (
        <div className={className.element('activity_indicator')}>
          <ActivityIndicator />
        </div>
      )
    }
  }

  render() {
    const courses = BEM('courses')

    return (
      <DashboardDetail title='Courses' icon='folder-o'>
        <div className={courses}>
          <div className={courses.element('tile_container')}>
            {this.renderTiles()}
          </div>
        </div>
        {this.renderActivityIndicator(courses)}
      </DashboardDetail>
    )
  }
}
