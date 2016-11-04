import React from 'react'
import { block as BEM } from 'bem-class'
import { CourseThumbnail } from 'components'

import './CoursesLayout.scss'

export default class CoursesLayout extends React.Component {
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
                         video_count={course.video_count}
                         key={course.id}
                         course_id={course.id} />
      )
    })
  }

  render() {
    const courses_layout = BEM('courses_layout')

    return (
      <div className={courses_layout}>
        <div className={courses_layout.element('heading')}>
          Courses &amp; Workshops
        </div>
        <div className={courses_layout.element('tile_container')}>
          {this.renderTiles()}
        </div>
      </div>
    )
  }
}
