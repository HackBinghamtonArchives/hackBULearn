import React from 'react'

import './Navigation.scss'
import logo from './logo.png'

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
        <div className='navigation__user_menu'>
          <div className='navigation__user_menu__name'>
            Zach Power
          </div>
        </div>
      </div>
    )
  }
}
