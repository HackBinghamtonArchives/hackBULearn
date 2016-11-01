import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'
import { Panel } from 'components'

import './CourseLayout.scss'

export default class CourseLayout extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  renderItem(title, options, className) {
    const item = className.element('item')
    const item_title = className.element('item_title')
    const item_status = className.element('item_status').modifier(options.status)

    return (
      <div className={item}>
        <div className={item_status}>
          <i></i>
        </div>
        <div className={item_title}>
          {title}
        </div>
      </div>
    )
  }

  renderFile(i, className) {
    return this.renderItem('File', {status: 'download'}, className)
  }

  renderVideo(i, className) {
    return this.renderItem('Course Video ' + i, {
      status: {
        'watched': i < 3,
        'unwatched': i >= 3
      }
    }, className)
  }

  render() {
    const course_layout = BEM('course_layout')
    const course_title = BEM('course_layout').element('title')

    return (
      <div className={course_layout}>
        <div className={course_title}>
          Introduction to Web Development
        </div>
        <Panel title='Course Materials' icon='files-o'>
          <div className={course_layout.element('subtitle')}>
            Videos
          </div>
          <div className={course_layout.element('video_section')}>
            <div className={course_layout.element('row')}>
              {_.times(4, (i) => this.renderVideo(i, course_layout))}
            </div>
            <div className={course_layout.element('row')}>
              {_.times(4, (i) => this.renderVideo(i+4, course_layout))}
            </div>
          </div>
          <div className={course_layout.element('subtitle')}>
            Example Files
          </div>
          <div className={course_layout.element('file_section')}>
            <div className={course_layout.element('row')}>
              {_.times(4, (i) => this.renderFile(i, course_layout))}
            </div>
            <div className={course_layout.element('row')}>
              {_.times(4, (i) => this.renderFile(i+4, course_layout))}
            </div>
          </div>
        </Panel>
      </div>
    )
  }
}
