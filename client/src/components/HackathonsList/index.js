import React from 'react'
import _ from 'lodash'

import ActivityIndicator from 'components/ActivityIndicator'
import DataView from 'components/DataView'
import HackathonEditor from 'containers/HackathonEditor'

import './style.scss'

export default class HackathonsList extends React.Component {
  static propTypes = {
    fetchHackathons: React.PropTypes.func.isRequired,
    createHackathon: React.PropTypes.func.isRequired,
    editHackathon: React.PropTypes.func.isRequired,
    deleteHackathon: React.PropTypes.func.isRequired,
    hackathons: React.PropTypes.object.isRequired
  }

  state = {}

  componentDidMount() {
    this.props.fetchHackathons()
  }

  constructor(props) {
    super(props)

    this.deleteHackathon = this.deleteHackathon.bind(this)
  }

  deleteHackathon(id) {
    this.props.deleteHackathon({ _id: id })
  }

  renderDate(dateString) {
    const date = new Date(dateString)
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December']

    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
  }

  render() {
    const activityIndicator = this.props.hackathons.isFetching && (
      <div className='hackathons-list__activity-indicator'>
        <ActivityIndicator />
      </div>
    )

    const editorPopup = this.props.hackathons.isEditing && (
      <HackathonEditor />
    )

    const columns = ['Hackathon', 'Location', 'Start Date', 'End Date']

    const data = _.mapValues(this.props.hackathons.data, (hackathon) => {
      return [
        hackathon.name,
        `${hackathon.location.city}, ${hackathon.location.state}`,
        this.renderDate(hackathon.dates.start),
        this.renderDate(hackathon.dates.end)
      ]
    })

    const dataTable = (
      <div className='hackathons-list__data-view'>
        <DataView
          columns={ columns }
          data={ data }
          onEdit={ this.props.editHackathon }
          onDelete={ this.deleteHackathon } />
      </div>
    )

    const newHackathonButton = !this.props.hackathons.isEditing && (
      <div
        className='hackathons-list__new-hackathon-button'
        onClick={ this.props.createHackathon }>
        New Hackathon
      </div>
    )

    const messageAlert = !_.isNil(this.props.hackathons.message) && (
      <div className='alert alert-info'>
        { this.props.hackathons.message }
      </div>
    )

    const errorAlert = this.props.hackathons.caughtError && (
      <div className='alert alert-danger'>
        { this.props.hackathons.error.message }
      </div>
    )

    return (
      <div className='hackathons-list'>
        { activityIndicator }
        { editorPopup }
        { messageAlert }
        { errorAlert }
        { dataTable }
        { newHackathonButton }
      </div>
    )
  }
}
