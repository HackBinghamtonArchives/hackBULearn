import React from 'react'
import { Link } from 'react-router'
import { block as BEM } from 'bem-class'

import './style.scss'

export default class DashboardDetail extends React.Component {
  static propTypes = {
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string.isRequired,
    rootPath: React.PropTypes.string,
    breadcrumb: React.PropTypes.string
  }

  state = {}

  constructor(props) {
    super(props)
  }

  renderTitle() {
    if(this.props.rootPath) {
      return (
        <Link to={'/dashboard' + this.props.rootPath}>
          <i className={'fa fa-' + this.props.icon}></i>
          {this.props.title}
        </Link>
      )
    } else {
      return (
        <div>
          <i className={'fa fa-' + this.props.icon}></i>
          {this.props.title}
        </div>
      )
    }
  }

  renderBreadcrumb(className) {
    if(this.props.breadcrumb) {
      return (
        <div className={className.element('breadcrumb')}>
          {this.props.breadcrumb}
        </div>
      )
    }
  }

  render() {
    const className = BEM('dashboard-detail')

    return (
      <div className={className}>
        <div className={className.element('title')}>
          {this.renderTitle()}
          {this.renderBreadcrumb(className)}
        </div>
        <div className={className.element('content')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
