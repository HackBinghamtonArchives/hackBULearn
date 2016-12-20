import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'
import { DashboardDetail } from 'components'

import './Overview.scss'

export default class Overview extends React.Component {
  static propTypes = {
    fetchUserInfo: React.PropTypes.func.isRequired,
    user: React.PropTypes.object
  }

  state = {}

  componentDidMount() {
    if(_.isEmpty(this.props.user.data)) this.props.fetchUserInfo()
  }

  constructor(props) {
    super(props)
  }

  render () {
    const overview = BEM('overview')
    const row = overview.element('row')

    return (
      <DashboardDetail title='Overview' icon='square-o'>
        <div className={overview + ' clearfix'}>
          {JSON.stringify(this.props.user)}
        </div>
      </DashboardDetail>
    )
  }
}
