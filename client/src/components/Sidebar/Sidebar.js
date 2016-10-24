import React from 'react'
import { block as BEM } from 'bem-class'
import { Link } from 'react-router'

import './Sidebar.scss'

export default class Sidebar extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render () {
    const sidebar = BEM('sidebar')

    return (
      <div className='sidebar'>
        <Link to='/dashboard/overview' className={sidebar.element('link')}
                                       activeClassName='active'>
          <i className={'fa fa-square-o ' + sidebar.element('link__icon')}
             aria-hidden='true'></i>
          Overview
        </Link>
        <Link to='/dashboard/courses' className={sidebar.element('link')}
                                      activeClassName='active'>
          <i className={'fa fa-folder-o ' + sidebar.element('link__icon')}
             aria-hidden='true'></i>
          Courses
        </Link>
        <Link to='/dashboard/achievements' className={sidebar.element('link')}
                                           activeClassName='active'>
          <i className={'fa fa-star-o ' + sidebar.element('link__icon')}
             aria-hidden='true'></i>
          Achievements
        </Link>
        <Link to='/dashboard/questions' className={sidebar.element('link')}
                                        activeClassName='active'>
          <i className={'fa fa-comment-o ' + sidebar.element('link__icon')}
             aria-hidden='true'></i>
          Questions
        </Link>
      </div>
    )
  }
}
