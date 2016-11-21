import React from 'react'
import { block as BEM } from 'bem-class'
import { DashboardDetail } from 'components'

import './Overview.scss'

export default class Overview extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render () {
    const overview = BEM('overview')
    const row = overview.element('row')

    return (
      <DashboardDetail title='Overview' icon='square-o'>
        <div className={overview + ' clearfix'}>

        </div>
      </DashboardDetail>
    )
  }
}
