import React from 'react'
import { block as BEM } from 'bem-class'

import './style.scss'

export default class ActivityIndicator extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render() {
    const activity_indicator = BEM('activity_indicator')

    return <div className={activity_indicator}></div>
  }
}
