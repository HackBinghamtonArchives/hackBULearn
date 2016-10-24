import React from 'react'
import { block as BEM } from 'bem-class'

import './CourseThumbnail.scss'

import placeholder from './placeholder.png'

export default class CourseThumbnail extends React.Component {
  static propTypes = {
    title: React.PropTypes.string,
    author: React.PropTypes.string,
    src: React.PropTypes.string
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
    if(this.props.src) {
      return (
        <div className={className.element('image')}
             style={{backgroundImage: 'url(' + this.props.src + ')'}}>
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

    return (
      <div className={course_thumbnail}>
        <div className={course_thumbnail.element('content')}>
          {this.renderThumbnailImage(course_thumbnail)}
          <div className={course_thumbnail.element('title')}>
            {this.props.title}
          </div>
          <div className={course_thumbnail.element('footer') + ' clearfix'}>
            <div className='pull-left'>
              <i className='fa fa-user' aria-hidden='true'></i>
              {this.props.author}
            </div>
            {this.renderCheckmark()}
          </div>
        </div>
      </div>
    )
  }
}
