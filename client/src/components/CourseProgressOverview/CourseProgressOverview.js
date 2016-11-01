import React from 'react'
import { block as BEM } from 'bem-class'
import { Panel } from 'components'

import './CourseProgressOverview.scss'

export default class CourseProgressOverview extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  renderIcon() {
    const course_icon = BEM('course_progress_overview').element('icon')

    return (
      <img className={course_icon} src='https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAARPAAAAJGI2MjYzYzFiLWFlMTItNGFmZC04NzkxLWU3MWY3ZDMyNjA5ZA.jpg' />
    )
  }

  renderItem(title, author, icon) {
    const course_progress = BEM('course_progress_overview')
    const course_item = course_progress.element('item')
    const course_author = course_progress.element('author')


    return (
      <div className={course_item}>
        {this.renderIcon()} {title}
        <div className={course_author}>
          by {author}
        </div>
      </div>
    )
  }

  render() {
    const course_progress = BEM('course_progress_overview')

    return (
      <div className={course_progress}>
        <Panel title='My Courses' icon='calendar-check-o'>
          <div className={course_progress.element('section_title')}>
            In Progress
          </div>
          <div className={course_progress.element('section')}>
            {this.renderItem('Course 1', 'Zach Power', null)}
            {this.renderItem('Course 2', 'Zach Power', null)}
          </div>
          <div className={course_progress.element('section_title')}>
            Completed
          </div>
          <div className={course_progress.element('section')}>
            {this.renderItem('Course 3', 'Zach Power', null)}
            {this.renderItem('Course 4', 'Zach Power', null)}
          </div>
        </Panel>
      </div>
    )
  }
}
