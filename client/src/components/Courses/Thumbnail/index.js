import React from 'react'
import { Link } from 'react-router'
import { block as BEM } from 'bem-class'

import placeholder from './placeholder.svg'

import './style.scss'

const Thumbnail = (props) => {
  const thumbnail = BEM('thumbnail')

  return (
    <div className={thumbnail}>
      <Link to={'/dashboard/courses/' + props.course_id}
        className={thumbnail.element('content')}>
          <div className={thumbnail.element('image')}>
            <img src={placeholder} />
          </div>
          <div className={thumbnail.element('text')}>
            <div className={thumbnail.element('title')}>
              {props.title}
            </div>
            <div className={thumbnail.element('description')}>
              {props.description}
            </div>
            <div className={thumbnail.element('button')}>
              Open Course
            </div>
          </div>
      </Link>
    </div>
  )
}

Thumbnail.propTypes = {
  title: React.PropTypes.string,
  thumbnail: React.PropTypes.string,
  src: React.PropTypes.string,
  course_id: React.PropTypes.string
}

export default Thumbnail
