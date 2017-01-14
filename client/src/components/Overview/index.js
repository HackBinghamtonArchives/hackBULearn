import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'

import DashboardDetail from 'components/DashboardDetail'
import Jumbotron from './Jumbotron'
import ActionCards from './ActionCards'

import './style.scss'

const Overview = () => {
  const className = BEM('overview')

  return (
    <DashboardDetail title='Overview' icon='square-o'>
      <Jumbotron />
      <ActionCards />
      <div className={ className.element('footer') }>
        <div className='pull-left'>
          Built with <i className='fa fa-heart' /> by&nbsp;
          <a href='https://github.com/zachpwr'>@zachpwr</a> and&nbsp;
          <a href='https://github.com/award28'>@award28</a>.
        </div>
        <div className='pull-right'>
          <a href='/logout'>Logout</a>
        </div>
      </div>
    </DashboardDetail>
  )
}

export default Overview
