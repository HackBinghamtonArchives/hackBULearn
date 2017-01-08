import React from 'react'
import { block as BEM } from 'bem-class'

import './style.scss'

const ActivityIndicator = () => {
  const activity_indicator = BEM('activity_indicator')
  return <div className={activity_indicator}></div>
}

export default ActivityIndicator
