import React from 'react'

import './CourseProgressOverview.scss'

export default class CourseProgressOverview extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  renderIcon() {
    return (
      <img className='course_progress_overview__content__section__item__icon' src='https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAARPAAAAJGI2MjYzYzFiLWFlMTItNGFmZC04NzkxLWU3MWY3ZDMyNjA5ZA.jpg' />
    )
  }

  render() {
    return (
      <div className='course_progress_overview'>
        <div className='course_progress_overview__content'>
          <div className='course_progress_overview__content__title'>
            <i className='fa fa-calendar-check-o'></i>
            My Courses
          </div>
          <div className='course_progress_overview__content__subtitle'>
            In Progress
          </div>
          <div className='course_progress_overview__content__section'>
            <div className='course_progress_overview__content__section__item'>
              {this.renderIcon()} Course 1
              <div className='course_progress_overview__content__section__item__subtitle'>
                by Zachary Power
              </div>
            </div>
            <div className='course_progress_overview__content__section__item'>
              {this.renderIcon()} Course 2
              <div className='course_progress_overview__content__section__item__subtitle'>
                by Zachary Power
              </div>
            </div>
          </div>
          <div className='course_progress_overview__content__subtitle'>
            Completed
          </div>
          <div className='course_progress_overview__content__section'>
            <div className='course_progress_overview__content__section__item'>
              {this.renderIcon()} Course 1
              <div className='course_progress_overview__content__section__item__subtitle'>
                by Zachary Power
              </div>
            </div>
            <div className='course_progress_overview__content__section__item'>
              {this.renderIcon()} Course 2
              <div className='course_progress_overview__content__section__item__subtitle'>
                by Zachary Power
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
