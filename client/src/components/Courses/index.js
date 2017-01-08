import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'

import ActivityIndicator from 'components/ActivityIndicator'
import DashboardDetail from 'components/DashboardDetail'
import Thumbnail from './Thumbnail'

import './style.scss'

export default class Courses extends React.Component {
  static propTypes = {
    courses: React.PropTypes.object.isRequired,
    fetchCourses: React.PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(!this.props.courses.cached) this.props.fetchCourses()
  }

  renderTiles() {
    if(!this.props.courses.isFetching) {
      return _.values(this.props.courses.data).map((course) => {
        if(course._id === -1) return
        return (
          <Thumbnail title={course.title}
            key={course._id}
            course_id={course._id}
            description={course.description} />
        )
      })
    }
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
