import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'

import './Badge.scss'

export default class Badge extends React.Component {
  static propTypes = {
    locked: React.PropTypes.bool,
    title: React.PropTypes.string.isRequired
  }

  state = {}

  constructor(props) {
    super(props)
  }

  renderCheckmark() {
    if(!this.props.locked) {
      return <i className='fa fa-check-circle'></i>
    }
  }

  render() {
    const badge = BEM('achievement_badge')

    return (
      <div className={badge}>
        <div className={badge.element('medal').modifier({
          'locked': this.props.locked
        })}></div>
        <div className={badge.element('caption')}>
          {this.renderCheckmark()} {this.props.title}
        </div>
      </div>
    )
  }
}
