import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'

import ActivityIndicator from 'components/ActivityIndicator'
import EditableDocument from 'components/EditableDocument'

import './style.scss'

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
        <div className={className.element('activity-indicator')}>
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
          'Name': {
            key: 'name',
            type: 'text'
          },
          'Start Date': {
            key: 'dates.start',
            type: 'date'
          },
          'End Date': {
            key: 'dates.end',
            type: 'date'
          },
          'Facility': {
            key: 'location.facility',
            type: 'text'
          },
          'University': {
            key: 'location.university',
            type: 'text'
          },
          'Address': {
            key: 'location.streetAddress',
            type: 'text'
          },
          'City': {
            key: 'location.city',
            type: 'text'
          },
          'State': {
            key: 'location.state',
            type: 'select',
            choices: [
              'Alaska',
              'Alabama',
              'Arkansas',
              'Arizona',
              'California',
              'Colorado',
              'Connecticut',
              'District of Columbia',
              'Delaware',
              'Florida',
              'Georgia',
              'Hawaii',
              'Iowa',
              'Idaho',
              'Illinois',
              'Indiana',
              'Kansas',
              'Kentucky',
              'Louisiana',
              'Massachusetts',
              'Maryland',
              'Maine',
              'Michigan',
              'Minnesota',
              'Missouri',
              'Mississippi',
              'Montana',
              'North Carolina',
              'North Dakota',
              'Nebraska',
              'New Hampshire',
              'New Jersey',
              'New Mexico',
              'Nevada',
              'New York',
              'Ohio',
              'Oklahoma',
              'Oregon',
              'Pennsylvania',
              'Rhode Island',
              'South Carolina',
              'South Dakota',
              'Tennessee',
              'Texas',
              'Utah',
              'Virginia',
              'Vermont',
              'Washington',
              'Wisconsin',
              'West Virginia',
              'Wyoming'
            ]
          },
          'Zip Code': {
            key: 'location.zipCode',
            type: 'text'
          },
          'Country': {
            key: 'location.country',
            type: 'select',
            choices: ['USA', 'Canada', 'Mexico']
          },
          'Banner URL': {
            key: 'bannerImage',
            type: 'text'
          },
          'Website URL': {
            key: 'websiteURL',
            type: 'text'
          },
          'Registration URL': {
            key: 'registrationURL',
            type: 'text'
          },
          'Capacity': {
            key: 'capacity',
            type: 'text'
          }
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
        <div className={className.element('new-document-button')}
          onClick={this.props.createHackathon}>
          New Hackathon
        </div>
      )
    }
  }

  render() {
    const className = BEM('hackathons-editor')

    return (
      <div className={className}>
        {this.renderActivityIndicator(className)}
        {this.renderValidationErrors()}
        {this.renderRows(className)}
        {this.renderNewDocumentButton(className)}
      </div>
    )
  }
}
