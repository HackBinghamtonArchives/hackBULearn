import React from 'react'
import { block as BEM } from 'bem-class'

import { Sidebar } from 'containers'

import './style.scss'

export default class DashboardMaster extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render () {
    const dashboard_master = BEM('dashboard_master')

    return (
      <div className={dashboard_master}>
        <Sidebar />
        <div className={dashboard_master.element('content_container')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
