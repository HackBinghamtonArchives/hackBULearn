import React from 'react'
import { block as BEM } from 'bem-class'

import './style.scss'

const Hackathon = (props) => {
  const className = BEM('hackathon')

  // Title rendering logic
  const title = (
    <div className={ className.element('title') }>
      <div className={ className.element('name') }>
        { props.hackathon.name }
      </div>
      <div className={ className.element('location') }>
        { props.hackathon.location.city }, { props.hackathon.location.state }
      </div>
    </div>
  )

  // Dates rendering logic
  const months = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ]

  const startDate = new Date(props.hackathon.dates.start)
  const endDate = new Date(props.hackathon.dates.end)

  const dates = (
    <div className={ className.element('dates') }>
      <div className={ className.element('start-date') }>
        { months[startDate.getMonth()] } { startDate.getDate() }
      </div>
      <div className={ className.element('end-date') }>
        { months[endDate.getMonth()] } { endDate.getDate() }
      </div>
    </div>
  )

  // Button rendering logic
  const websiteButton = !_.isNil(props.hackathon.websiteURL) && (
    <a
      href={ props.hackathon.websiteURL }
      target="_blank"
      title="View Hackathon Website"
      className={ className.element('button').modifier('website') }>
        View Website
    </a>
  )

  const registerButton = !_.isNil(props.hackathon.registrationURL) && (
    <a
      href={ props.hackathon.registrationURL }
      target="_blank"
      title="Register for this hackathon"
      className={ className.element('button').modifier('register') }>
        Register
    </a>
  )

  const actions = (
    <div className={ className.element('actions') }>
      { websiteButton }
      { registerButton }
    </div>
  )

  // Banner rendering logic
  const bannerStyle = {
    backgroundImage: 'url(' + props.hackathon.bannerImage + ')'
  }

  const banner = (
    <div
      className={ className.element('banner') }
      style={ bannerStyle }>
    </div>
  )

  // Component rendering logic
  return (
    <div className={ className }>
      { banner }
      <div className={ className.element('info') }>
        { title }
        { dates }
        { actions }
      </div>
    </div>
  )
}

Hackathon.propTypes = {
  hackathon: React.PropTypes.object.isRequired
}

export default Hackathon
