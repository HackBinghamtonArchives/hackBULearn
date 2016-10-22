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
    return (
      <div className='course_layout'>
        <div className='courses_layout__heading'>
          Courses &amp; Workshops
        </div>
      </div>
    )
  }
}
