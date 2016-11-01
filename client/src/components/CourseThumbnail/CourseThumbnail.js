import React from 'react'
import { Link } from 'react-router'
import { block as BEM } from 'bem-class'

import placeholder from './placeholder.png'

import './CourseThumbnail.scss'

export default class CourseThumbnail extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    thumbnail: React.PropTypes.string,
    video_count: React.PropTypes.number,
    src: React.PropTypes.string,
    course_id: React.PropTypes.number
  }

  state = {}

  constructor(props) {
    super(props)
  }

  renderCheckmark() {
    if(this.props.completed) {
      return (
        <div className='pull-right text-success'>
          <i className='fa fa-check-circle-o' aria-hidden='true'></i>
          Complete
        </div>
      )
    } else {
      return (
        <div className='pull-right'>
          <i className='fa fa-circle-o' aria-hidden='true'></i>
          Incomplete
        </div>
      )
    }
  }

  renderThumbnailImage(className) {
    if(this.props.thumbnail) {
      return (
        <div className={className.element('image')}
             style={{backgroundImage: 'url(' + this.props.thumbnail + ')'}}>
        </div>
      )
    } else {
      return (
        <div className={className.element('image')}
             style={{backgroundImage: 'url(/bundles/' + placeholder + ')'}}>
        </div>
      )
    }
  }

  render() {
    const course_thumbnail = BEM('course_thumbnail')
    const content = course_thumbnail.element('content')
    const title = course_thumbnail.element('title')
    const footer = course_thumbnail.element('footer')

    return (
      <Link to={'/dashboard/course/' + this.props.course_id}
            className={course_thumbnail}>
        <div className={content}>
          {this.renderThumbnailImage(course_thumbnail)}
          <div className={title}>
            {this.props.title}
          </div>
          <div className={footer + ' clearfix'}>
            <div className='pull-left'>
              <i className='fa fa-video-camera' aria-hidden='true'></i>
              {this.props.video_count} Videos
            </div>
            {this.renderCheckmark()}
          </div>
        </div>
      </Link>
    )
  }
}
