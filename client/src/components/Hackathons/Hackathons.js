import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'
import { DashboardDetail, ActivityIndicator, Hackathon } from 'components'

import './Hackathons.scss'

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
        <div className={className.element('activity_indicator')}>
          <ActivityIndicator />
        </div>
      )
    }
  }

  render () {
    const hackathons = BEM('hackathons')

    return (
      <DashboardDetail title='Hackathons' icon='calendar-o'>
        {this.renderActivityIndicator(hackathons)}
        <div className={hackathons}>
          {this.renderHackathons(hackathons)}
        </div>
      </DashboardDetail>
    )
  }
}
