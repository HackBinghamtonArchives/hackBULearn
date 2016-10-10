import React from 'react'

import { Navigation, Sidebar } from 'components'

import './DashboardLayout.scss'

export default class DashboardLayout extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className='dashboard_layout'>
        <Navigation />
        <Sidebar />
        {this.props.children}
      </div>
    )
  }
}
