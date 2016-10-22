import React from 'react'

import './OverviewGraph.scss'

export default class OverviewGraph extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  

  render() {
    return (
      <div className='overview_graph'>
        <div className='overview_graph__content'>
          <div className='overview_graph__content__title'>
            <i className='fa fa-line-chart'></i>
            My Progress
          </div>
        </div>
      </div>
    )
  }
}
