import React from 'react'
import { block as BEM } from 'bem-class'

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
    const navigation = BEM('navigation')

    return (
      <div className={navigation}>
        <div className={navigation.element('logo')}>
          <img src={'/bundles/' + logo} />
        </div>
        <div className={navigation.element('filler')}></div>
        <UserMenu name='Zach Power' />
      </div>
    )
  }
}
