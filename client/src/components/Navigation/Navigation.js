import React from 'react'

import { UserMenu } from 'components'

import './Navigation.scss'
import logo from './logo_white.png'

export default class Navigation extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className='navigation'>
        <div className='navigation__logo'>
          <img src={'/bundles/' + logo} />
        </div>
        <div className='navigation__filler'></div>
        <UserMenu name='Zach Power' />
      </div>
    )
  }
}
