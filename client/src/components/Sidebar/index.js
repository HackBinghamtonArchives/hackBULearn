import React from 'react'
import { block as BEM } from 'bem-class'
import { Link } from 'react-router'

import './style.scss'

export default class Sidebar extends React.Component {
  static propTypes = {
    fetchUserInfo: React.PropTypes.func.isRequired
  }

  state = {}

  componentDidMount() {
    if(_.isEmpty(this.props.user.data) && !this.props.user.isLoading) {
      this.props.fetchUserInfo()
    }
  }

  constructor(props) {
    super(props)
  }

  renderLogo(className) {
    return <div className={className.element('logo')}></div>
  }

  renderLink(text,icon,href,className) {
    return (
      <Link to={'/dashboard/' + href} className={className.element('link')}
        activeClassName='active'>
          <i className={'fa fa-' + icon + ' ' + className.element('link__icon')}
             aria-hidden='true'></i>
          {text}
      </Link>
    )
  }

  renderAdminLink(className) {
    const currentRole = this.props.user.data.permission;
    const requiredRoles = ['superuser', 'administrator'];
    const isAdmin = requiredRoles.indexOf(currentRole) != -1;
    if(isAdmin) {
      return this.renderLink('Administration', 'gears', 'admin', className)
    }
  }

  render () {
    const className = BEM('sidebar')

    return (
      <div className='sidebar'>
        {this.renderLogo(className)}
        {this.renderLink('Overview', 'square-o', 'overview', className)}
        {this.renderAdminLink(className)}
        {this.renderLink('Hackathons', 'calendar-o', 'hackathons', className)}
        {this.renderLink('Courses', 'folder-o', 'courses', className)}
        {this.renderLink('Questions', 'comment-o', 'questions', className)}
      </div>
    )
  }
}
