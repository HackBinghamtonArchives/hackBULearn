import React from 'react'
import _ from 'lodash'

import './UserMenu.scss'

export default class UserMenu extends React.Component {
  static propTypes = {
    name: React.PropTypes.string.isRequired
  }

  state = {
    active: false
  }

  constructor(props) {
    super(props)

    this.toggleMenu = this.toggleMenu.bind(this)
    this.hideMenu = this.hideMenu.bind(this)
  }

  getInitials() {
    return _.map(this.props.name.split(' '), (word) => word[0])
  }

  toggleMenu() {
    this.setState({ active: !this.state.active })
  }

  hideMenu() {
    this.setState({ active: false })
  }

  renderMenuItems() {
    if(this.state.active) {
      return (
        <div className='user_menu__button__list'>
          <a href='#' className='user_menu__button__list__item'>
            <i className='fa fa-cogs' aria-hidden='true'></i>
            Settings
          </a>
          <a href='#' className='user_menu__button__list__item'>
            <i className='fa fa-sign-out' aria-hidden='true'></i>
            Log Out
          </a>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='user_menu'
            onClick={this.toggleMenu}
            onMouseLeave={this.hideMenu}>
        <div className='user_menu__button'>
          <div className='user_menu__button__icon'>
            {this.getInitials()}
          </div>
          <div className='user_menu__button__name'>
            {this.props.name}
          </div>
          {this.renderMenuItems()}
        </div>
      </div>
    )
  }
}
