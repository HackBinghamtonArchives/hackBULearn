import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'
import { DashboardDetail, ActivityIndicator } from 'components'

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

  renderActivityIndicator(className) {
    if(this.props.user.isFetching) {
      return (
        <div className={className.element('activity_indicator')}>
          <ActivityIndicator />
        </div>
      )
    }
  }

  render () {
    const overview = BEM('overview')

    return (
      <DashboardDetail title='Overview' icon='square-o'>
        {this.renderActivityIndicator(overview)}
      </DashboardDetail>
    )
  }
}
