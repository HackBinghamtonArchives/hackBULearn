import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'
import { Link } from 'react-router'

import './style.scss'

export default class Sidebar extends React.Component {
  static propTypes = {
    fetchUser: React.PropTypes.func.isRequired,
    users: React.PropTypes.shape({
      isFetching: React.PropTypes.bool.isRequired,
      caughtError: React.PropTypes.bool.isRequired,
      message: React.PropTypes.string,
      error: React.PropTypes.object,
      data: React.PropTypes.object,
      cached: React.PropTypes.bool.isRequired,
      currentUser: React.PropTypes.object,
      me: React.PropTypes.string
    }).isRequired
  }

  state = {}

  componentDidMount() {
    if(_.isNil(this.props.users.me) && !this.props.users.isLoading) {
      this.props.fetchUser('me')
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
    const currentUser = _.get(this.props.users.data, this.props.users.me)
    const currentRole = !_.isNil(currentUser) && currentUser.permission;
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
