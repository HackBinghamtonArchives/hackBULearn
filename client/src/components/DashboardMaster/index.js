import React from 'react'
import { block as BEM } from 'bem-class'

import { Sidebar } from 'containers'

import './style.scss'

const DashboardMaster = (props) => {
  const className = BEM('dashboard-master')

  return (
    <div className={className}>
      <Sidebar />
      <div className={className.element('content-container')}>
        {props.children}
      </div>
    </div>
  )
}

export default DashboardMaster
