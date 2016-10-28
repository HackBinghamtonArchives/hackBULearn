import React from 'react'
import { block as BEM } from 'bem-class'
import { CourseThumbnail } from 'components'

import './CoursesLayout.scss'

export default class CoursesLayout extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  renderTiles(series) {
    return _.times(20, (i) => {
      return (
        <CourseThumbnail title={'Course ' + (i+1)}
                         video_count={5}
                         key={i}
                         course_id={i} />
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
          {this.renderTiles('Workshops')}
        </div>
      </div>
    )
  }
}
