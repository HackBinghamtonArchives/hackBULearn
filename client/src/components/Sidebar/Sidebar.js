import React from 'react'
import { block as BEM } from 'bem-class'
import { Link } from 'react-router'

import './Sidebar.scss'

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
    if(this.props.user.data.permission <= 2) {
      return this.renderLink('Administration', 'gears', 'admin', className)
    }
  }

  render () {
    const sidebar = BEM('sidebar')

    return (
      <div className='sidebar'>
        {this.renderLogo(sidebar)}
        {this.renderAdminLink(sidebar)}
        {this.renderLink('Overview', 'square-o', 'overview', sidebar)}
        {this.renderLink('Hackathons', 'calendar-o', 'hackathons', sidebar)}
        {this.renderLink('Courses', 'folder-o', 'courses', sidebar)}
        {this.renderLink('Questions', 'comment-o', 'questions', sidebar)}
      </div>
    )
  }
}
