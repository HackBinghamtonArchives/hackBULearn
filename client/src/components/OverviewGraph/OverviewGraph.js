import React from 'react'
import { block as BEM } from 'bem-class'
import { Panel } from 'components'

import './OverviewGraph.scss'

export default class OverviewGraph extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  renderDay(day, month, year, color, className) {
    const graph_day = className.element('day').modifier(color)
    return <div className={graph_day} title={month + '/' + day + '/' + year}></div>
  }

  renderMonth(month, year, day_count, className) {
    return _.times(day_count, (i) => {
            return this.renderDay(i+1, month, year, {'success': Math.random() > 0.5}, className)
          })
  }

  renderYear(year, className) {
    const leapday = (!(year % 100 == 0 && year % 400 != 0) && year % 4 == 0) ? 1 : 0
    const days_per_month = [31, 28 + leapday, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const graph_year = className.element('year')

    return (
      <div className={graph_year}>
        {
          _.map(days_per_month, (days, i) => this.renderMonth(i+1, year, days, className))
        }
      </div>
    )
  }

  render() {
    const overview_graph = BEM('overview_graph')
    const section_title = overview_graph.element('section_title')
    const section = overview_graph.element('section')
    const year = new Date().getFullYear()

    return (
      <div className={overview_graph}>
        <Panel title='My Progress' icon='line-chart'>
          <div className={section_title}>{year} Activity</div>
          <div className={section}>
            {this.renderYear(year, overview_graph)}
          </div>
          <div className={section_title}>Achievements</div>
          <div className={section}>

          </div>
        </Panel>
      </div>
    )
  }
}
