import React from 'react'
import { block as BEM } from 'bem-class'

import './Panel.scss'

export default class CourseProgressOverview extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string
  }

  state = {}

  constructor(props) {
    super(props)
  }

  renderIcon() {
    if(this.props.icon) {
      return (
        <i className={'fa fa-' + this.props.icon}></i>
      )
    }
  }

  render() {
    const panel = BEM('panel')

    return (
      <div className={panel}>
        <div className={panel.element('content')}>
          <div className={panel.element('title')}>
            {this.renderIcon()}
            {this.props.title}
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
}
