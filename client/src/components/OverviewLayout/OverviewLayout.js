import React from 'react'
import { block as BEM } from 'bem-class'
import { HeroUnit, CourseProgressOverview, OverviewGraph } from 'components'

import './OverviewLayout.scss'

export default class OverviewLayout extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render () {
    const overview_layout = BEM('overview_layout')

    return (
      <div className={overview_layout + ' clearfix'}>
        <HeroUnit />
        <CourseProgressOverview />
        <OverviewGraph />
      </div>
    )
  }
}
