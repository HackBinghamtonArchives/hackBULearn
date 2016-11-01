import React from 'react'
import { block as BEM } from 'bem-class'

import { Navigation, Sidebar } from 'components'

import './DashboardLayout.scss'

export default class DashboardLayout extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render () {
    const dashboard_layout = BEM('dashboard_layout')
    
    return (
      <div className={dashboard_layout}>
        <Navigation />
        <Sidebar />
        <div className={dashboard_layout.element('content_container')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
