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
    const row = overview_layout.element('row')

    return (
      <div className={overview_layout + ' clearfix'}>
        <div className={row}>
          <HeroUnit />
        </div>
        <div className={row}>
          <CourseProgressOverview />
          <OverviewGraph />
        </div>
      </div>
    )
  }
}
