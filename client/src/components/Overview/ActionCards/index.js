import React from 'react'
import { block as BEM } from 'bem-class'
import { Link } from 'react-router-dom'

import './style.scss'

const ActionCards = () => {
  const className = BEM('action-cards')

  // Render logic for individual items
  const registerCard = (
    <Link to='/dashboard/hackathons'
      className={ className.element('item').modifier('register') }>
      <div className={ className.element('item-content') }>
        <h3>Register for a Hackathon</h3>
        <p>
          Experience hacking first-hand alongside other Binghamton students.
        </p>
      </div>
    </Link>
  )

  const learnCard = (
    <Link to='/dashboard/courses'
      className={ className.element('item').modifier('learn') }>
      <div className={ className.element('item-content') }>
        <h3>Learn a Skill</h3>
        <p>
          Improve your craft with HackBU's programming workshops and tutorials.
        </p>
      </div>
    </Link>
  )

  const askCard = (
    <Link to='/dashboard/questions'
      className={ className.element('item').modifier('ask') }>
      <div className={ className.element('item-content') }>
        <h3>Ask an Expert</h3>
        <p>
          Have a tech question? Ask HackBU for help with our online application.
        </p>
      </div>
    </Link>
  )

  const settingsCard = (
    <Link to='/dashboard/settings'
      className={ className.element('item').modifier('settings') }>
      <div className={ className.element('item-content') }>
        <h3>Change Settings</h3>
        <p>
          Modify your account settings to improve your experience with HackBU.
        </p>
      </div>
    </Link>
  )

  return (
    <div className={ className }>
      { registerCard }
      { learnCard }
      { askCard }
      { settingsCard }
    </div>
  )
}

export default ActionCards
