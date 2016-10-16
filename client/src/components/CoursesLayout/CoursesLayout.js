import React from 'react'
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
                         author='Zach Power'
                         src='https://media.licdn.com/mpr/mpr/p/3/005/08c/1cc/0f286f6.jpg'
                         key={i} />
      )
    })
  }

  render() {
    return (
      <div className='courses_layout'>
        <div className='courses_layout__heading'>
          Courses &amp; Workshops
        </div>
        <div className='courses_layout__tile_container'>
          {this.renderTiles('Workshops')}
        </div>
      </div>
    )
  }
}
