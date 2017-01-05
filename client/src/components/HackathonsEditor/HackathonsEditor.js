import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'
import { ActivityIndicator, EditableDocument } from 'components'

import './HackathonsEditor.scss'

export default class HackathonsEditor extends React.Component {
  static propTypes = {
    fetchHackathons: React.PropTypes.func.isRequired,
    createHackathon: React.PropTypes.func.isRequired,
    saveHackathon: React.PropTypes.func.isRequired,
    deleteHackathon: React.PropTypes.func.isRequired,
    hackathons: React.PropTypes.object.isRequired
  }

  componentDidMount() {
    this.props.fetchHackathons()
  }

  constructor(props) {
    super(props)
  }

  renderActivityIndicator(className) {
    if(this.props.hackathons.isFetching) {
      return (
        <div className={className.element('activity_indicator')}>
          <ActivityIndicator />
        </div>
      )
    }
  }

  renderValidationErrors() {
    if(this.props.hackathons.caughtError) {
      const errors = []

      if(this.props.hackathons.error.errors) {
        _.values(this.props.hackathons.error.errors).forEach((error) => {
          errors.push(
            <div className='alert alert-danger' key={error.message}>
              {error.message}
            </div>
          )
        })
      } else {
        errors.push(
          <div className='alert alert-danger' key='error'>
            {this.props.hackathons.error.message}
          </div>
        )
      }

      return errors
    }
  }

  renderRows(className) {
    if(!this.props.hackathons.isFetching) {
      return _.values(this.props.hackathons.data).map((hackathon) => {
        const columns = {
          'Name': 'name',
          'Start Date': 'dates.start',
          'End Date': 'dates.end',
          'Facility': 'location.facility',
          'University': 'location.university',
          'Address': 'location.streetAddress',
          'City': 'location.city',
          'State': 'location.state',
          'Zip Code': 'location.zipCode',
          'Country': 'location.country',
          'Banner URL': 'bannerImage',
          'Website URL': 'websiteURL',
          'Registration URL': 'registrationURL',
          'Capacity': 'capacity'
        }

        return (
          <EditableDocument row={hackathon} columns={columns} key={hackathon._id}
            updateDocument={this.props.saveHackathon}
            deleteDocument={this.props.deleteHackathon} />
        )
      })
    }
  }

  renderNewDocumentButton(className) {
    if(!this.props.hackathons.isFetching) {
      return (
        <div className={className.element('new_document_button')}
          onClick={this.props.createHackathon}>
          New Hackathon
        </div>
      )
    }
  }

  render() {
    const hackathons_editor = BEM('hackathons_editor')

    return (
      <div className={hackathons_editor}>
        {this.renderActivityIndicator(hackathons_editor)}
        {this.renderValidationErrors()}
        {this.renderRows(hackathons_editor)}
        {this.renderNewDocumentButton(hackathons_editor)}
      </div>
    )
  }
}
