import React from 'react'
import { block as BEM } from 'bem-class'

import './CourseProgressOverview.scss'

export default class CourseProgressOverview extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  renderIcon() {
    const course_icon = BEM('course_progress_overview__item__icon')
    
    return (
      <img className={course_icon} src='https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAARPAAAAJGI2MjYzYzFiLWFlMTItNGFmZC04NzkxLWU3MWY3ZDMyNjA5ZA.jpg' />
    )
  }

  renderItem(title, author, icon) {
    const course_item = BEM('course_progress_overview__item')

    return (
      <div className={course_item}>
        {this.renderIcon()} {title}
        <div className={course_item.element('author')}>
          by {author}
        </div>
      </div>
    )
  }

  render() {
    const course_progress = BEM('course_progress_overview')

    return (
      <div className={course_progress}>
        <div className={course_progress.element('content')}>
          <div className={course_progress.element('title')}>
            <i className='fa fa-calendar-check-o'></i>
            My Courses
          </div>
          <div className={course_progress.element('subtitle')}>
            In Progress
          </div>
          <div className={course_progress.element('section')}>
            {this.renderItem('Course 1', 'Zach Power', null)}
            {this.renderItem('Course 2', 'Zach Power', null)}
          </div>
          <div className={course_progress.element('subtitle')}>
            Completed
          </div>
          <div className={course_progress.element('section')}>
            {this.renderItem('Course 3', 'Zach Power', null)}
            {this.renderItem('Course 4', 'Zach Power', null)}
          </div>
        </div>
      </div>
    )
  }
}
