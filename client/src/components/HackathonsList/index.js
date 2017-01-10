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
    deleteHackathon: React.PropTypes.func.isRequired,
    hackathons: React.PropTypes.object.isRequired
  }

  state = {
    isEditing: false,
    currentHackathon: -1
  }

  componentDidMount() {
    this.props.fetchHackathons()
  }

  constructor(props) {
    super(props)

    this.enableEditor = this.enableEditor.bind(this)
    this.disableEditor = this.disableEditor.bind(this)
    this.deleteHackathon = this.deleteHackathon.bind(this)
  }

  enableEditor(id) {
    this.setState({
      isEditing: true,
      currentHackathon: id
    })
  }

  disableEditor() {
    this.setState({
      isEditing: false,
      currentHackathon: -1
    })
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

    const editorPopup = this.state.isEditing && (
      <HackathonEditor
        hackathonId={ this.state.currentHackathon }
        onClose={ this.disableEditor } />
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
      <DataView
        columns={ columns }
        data={ data }
        onEdit={ this.enableEditor }
        onDelete={ this.deleteHackathon } />
    )

    return (
      <div className='hackathons-list'>
        { activityIndicator }
        { editorPopup }
        { dataTable }
      </div>
    )
  }
}
