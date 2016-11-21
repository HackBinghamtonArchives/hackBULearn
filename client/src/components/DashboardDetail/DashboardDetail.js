import React from 'react'
import { Link } from 'react-router'
import { block as BEM } from 'bem-class'

import './DashboardDetail.scss'

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
    const dashboard_detail = BEM('dashboard_detail')

    return (
      <div className={dashboard_detail}>
        <div className={dashboard_detail.element('title')}>
          {this.renderTitle()}
          {this.renderBreadcrumb(dashboard_detail)}
        </div>
        <div className={dashboard_detail.element('content')}>
          {this.props.children}
        </div>
      </div>
    )
  }
}
