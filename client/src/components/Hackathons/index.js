import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'

import ActivityIndicator from 'components/ActivityIndicator'
import DashboardDetail from 'components/DashboardDetail'
import Hackathon from 'components/Hackathon'

import './style.scss'

export default class Hackathons extends React.Component {
  static propTypes = {
    fetchHackathons: React.PropTypes.func.isRequired,
    hackathons: React.PropTypes.object.isRequired
  }

  state = {}

  componentDidMount() {
    this.props.fetchHackathons();
  }

  constructor(props) {
    super(props)
  }

  renderHackathons(className) {
    if(!this.props.hackathons.isLoading && !this.props.hackathons.caughtError) {
      return _.map(this.props.hackathons.data, (hackathon) => {
        return <Hackathon hackathon={hackathon} key={hackathon._id} />
      })
    }
  }

  renderActivityIndicator(className) {
    if(this.props.hackathons.isLoading) {
      return (
        <div className={className.element('activity-indicator')}>
          <ActivityIndicator />
        </div>
      )
    }
  }

  render () {
    const className = BEM('hackathons')

    return (
      <DashboardDetail title='Hackathons' icon='calendar-o'>
        {this.renderActivityIndicator(className)}
        <div className={className}>
          {this.renderHackathons(className)}
        </div>
      </DashboardDetail>
    )
  }
}
