import React from 'react'
import { block as BEM } from 'bem-class'

import { Sidebar } from 'containers'

import './style.scss'

const DashboardMaster = (props) => {
  const dashboard_master = BEM('dashboard_master')

  return (
    <div className={dashboard_master}>
      <Sidebar />
      <div className={dashboard_master.element('content_container')}>
        {props.children}
      </div>
    </div>
  )
}

export default DashboardMaster
