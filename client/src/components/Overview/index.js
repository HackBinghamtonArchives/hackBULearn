import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'

import ActivityIndicator from 'components/ActivityIndicator'
import DashboardDetail from 'components/DashboardDetail'

import './style.scss'

export default class Overview extends React.Component {
  static propTypes = {
    fetchUserInfo: React.PropTypes.func.isRequired,
    user: React.PropTypes.object
  }

  state = {}

  componentDidMount() {
    if(_.isEmpty(this.props.user.data) && !this.props.user.isLoading) {
      this.props.fetchUserInfo()
    }
  }

  constructor(props) {
    super(props)
  }

  renderActivityIndicator(className) {
    if(this.props.user.isFetching) {
      return (
        <div className={className.element('activity-indicator')}>
          <ActivityIndicator />
        </div>
      )
    }
  }

  render () {
    const className = BEM('overview')

    return (
      <DashboardDetail title='Overview' icon='square-o'>
        {this.renderActivityIndicator(className)}
      </DashboardDetail>
    )
  }
}
