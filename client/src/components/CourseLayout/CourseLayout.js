import React from 'react'
import { CourseThumbnail } from 'components'

import './CourseLayout.scss'

export default class CourseLayout extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render() {
    const course_layout = BEM('course_layout')

    return (
      <div className={course_layout}>
        <div className={course_layout.element('heading')}>
          Courses &amp; Workshops
        </div>
      </div>
    )
  }
}
