import React from 'react'
import { block as BEM } from 'bem-class'

import './style.scss'

const ActivityIndicator = () => {
  const className = BEM('activity-indicator')
  return <div className={className}></div>
}

export default ActivityIndicator
