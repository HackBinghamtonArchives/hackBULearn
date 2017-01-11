import React from 'react'
import _ from 'lodash'

import ActivityIndicator from 'components/ActivityIndicator'
import FormView from 'components/FormView'
import PopupView from 'components/PopupView'

import './style.scss'

export default class HackathonEditor extends React.Component {
  static propTypes = {
    hackathons: React.PropTypes.object.isRequired,
    exitHackathon: React.PropTypes.func.isRequired,
    saveHackathon: React.PropTypes.func.isRequired
  }

  state = {
    hackathon: {
      dates: {
        start: '1995-01-01T05:00:00.000Z',
        end: '1995-01-01T05:00:00.000Z'
      }
    },
    saved: true
  }

  componentWillMount() {
    if(this.props.hackathons.currentHackathon) {
      const hackathon = _.cloneDeep(this.props.hackathons.data[this.props.hackathons.currentHackathon])
      this.setState({ hackathon })
    }
  }

  constructor(props) {
    super(props)

    this.onEdit = this.onEdit.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onEdit(e) {
    var hackathon = _.cloneDeep(this.state.hackathon)
    _.set(hackathon, e.target.name, e.target.value)
    this.setState({ hackathon, saved: false })
  }

  onSave() {
    this.props.saveHackathon(this.state.hackathon)
  }

  render() {
    const activityIndicator = this.props.hackathons.isFetching && (
      <div className='hackathon-editor__activity-indicator'>
        <ActivityIndicator />
      </div>
    )

    const form = !this.props.hackathons.isFetching && (
      <FormView
        data={ this.state.hackathon }
        error={ this.props.hackathons.error }
        onChange={ this.onEdit }
        onSubmit={ this.onSave }
        disableSubmit={ this.state.saved } >
        <FormView.TextInput title='Hackathon' name='name' />
        <FormView.NumberInput title='Capacity' name='capacity' />
        <FormView.DateInput title='Start Date' name='dates.start' />
        <FormView.DateInput title='End Date' name='dates.end'/>
        <FormView.TextInput title='Website URL' name='websiteURL' />
        <FormView.TextInput title='Registration URL' name='registrationURL' />
        <FormView.TextInput title='Banner Image URL' name='bannerImage' />
        <FormView.TextInput title='University' name='location.university' />
        <FormView.TextInput title='Facility' name='location.facility' />
        <FormView.TextInput title='Street Address' name='location.streetAddress' />
        <FormView.TextInput title='City' name='location.city' />
        <FormView.TextInput title='State' name='location.state' />
        <FormView.TextInput title='ZIP Code' name='location.zipCode' />
        <FormView.TextInput title='Country' name='location.country' />
      </FormView>
    )

    return (
      <PopupView title='Edit Hackathon' onClose={ this.props.exitHackathon }>
        {activityIndicator}
        {form}
      </PopupView>
    )
  }
}
