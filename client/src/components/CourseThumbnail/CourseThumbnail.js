import React from 'react'
import { Link } from 'react-router'
import { block as BEM } from 'bem-class'

import placeholder from './placeholder.svg'

import './CourseThumbnail.scss'

export default class CourseThumbnail extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    thumbnail: React.PropTypes.string,
    src: React.PropTypes.string,
    course_id: React.PropTypes.string
  }

  state = {}

  constructor(props) {
    super(props)
  }

  render() {
    const course_thumbnail = BEM('course_thumbnail')

    return (
      <div className={course_thumbnail}>
        <Link to={'/dashboard/courses/' + this.props.course_id}
          className={course_thumbnail.element('content')}>
            <div className={course_thumbnail.element('image')}>
              <img src={placeholder} />
            </div>
            <div className={course_thumbnail.element('text')}>
              <div className={course_thumbnail.element('title')}>
                {this.props.title}
              </div>
              <div className={course_thumbnail.element('description')}>
                {this.props.description}
              </div>
              <div className={course_thumbnail.element('button')}>
                Open Course
              </div>
            </div>
        </Link>
      </div>
    )
  }
}
