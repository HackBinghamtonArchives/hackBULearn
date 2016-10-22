import React from 'react'
import { HeroUnit, CourseProgressOverview, OverviewGraph } from 'components'

import './OverviewLayout.scss'

export default class OverviewLayout extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className='overview_layout clearfix'>
        <HeroUnit />
        <CourseProgressOverview />
        <OverviewGraph />
      </div>
    )
  }
}
