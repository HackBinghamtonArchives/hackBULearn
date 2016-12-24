import React from 'react'
import { block as BEM } from 'bem-class'

import './Hackathon.scss'

export default class Hackathon extends React.Component {
  static propTypes = {
    hackathon: React.PropTypes.object.isRequired
  }

  state = {}

  constructor(props) {
    super(props)
  }

  renderTitle(className) {
    return (
      <div className={className.element('title')}>
        <div className={className.element('name')}>
          {this.props.hackathon.name}
        </div>
        <div className={className.element('location')}>
          {this.props.hackathon.location.city}, {this.props.hackathon.location.state}
        </div>
      </div>
    )
  }

  renderDates(className) {
    const months = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ]

    const startDate = new Date(this.props.hackathon.dates.start)
    const endDate = new Date(this.props.hackathon.dates.end)

    return (
      <div className={className.element('dates')}>
        <div className={className.element('start_date')}>
          {months[startDate.getMonth()]} {startDate.getDate()}
        </div>
        <div className={className.element('end_date')}>
          {months[endDate.getMonth()]} {endDate.getDate()}
        </div>
      </div>
    )
  }

  renderWebsiteButton(className) {
    if(this.props.hackathon.websiteURL) {
      return (
        <a
          href={this.props.hackathon.websiteURL}
          target="_blank"
          title="View Hackathon Website"
          className={className.element('button').modifier('website')}>
            View Website
        </a>
      )
    }
  }

  renderActions(className) {
    return (
      <div className={className.element('actions')}>
        {this.renderWebsiteButton(className)}
        <div className={className.element('button').modifier('register')}>
          Register
        </div>
      </div>
    )
  }

  renderBanner(className) {
    const style = {
      backgroundImage: 'url(' + this.props.hackathon.bannerImage + ')'
    }

    return (
      <div
        className={className.element('banner')}
        style={style}>
      </div>
    )
  }

  render () {
    const hackathon = BEM('hackathon')

    return (
      <div className={hackathon}>
        {this.renderBanner(hackathon)}
        <div className={hackathon.element('info')}>
          {this.renderTitle(hackathon)}
          {this.renderDates(hackathon)}
          {this.renderActions(hackathon)}
        </div>
      </div>
    )
  }
}
