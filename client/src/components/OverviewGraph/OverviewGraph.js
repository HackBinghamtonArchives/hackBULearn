import React from 'react'
import { block as BEM } from 'bem-class'

import './OverviewGraph.scss'

export default class OverviewGraph extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render() {
    const overview_graph = BEM('overview_graph')

    return (
      <div className={overview_graph}>
        <div className={overview_graph.element('content')}>
          <div className={overview_graph.element('content__title')}>
            <i className='fa fa-line-chart'></i>
            My Progress
          </div>
        </div>
      </div>
    )
  }
}
