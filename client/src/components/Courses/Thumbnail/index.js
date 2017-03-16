import React from 'react'
import { Link } from 'react-router-dom'
import { block as BEM } from 'bem-class'

import './style.scss'

const Thumbnail = (props) => {
  const className = BEM('thumbnail').modifier(props.thumbnail)

  return (
    <div className={className}>
      <Link to={'/dashboard/courses/' + props.course_id}
        className={className.element('content')}>
          <div className={className.element('image')}></div>
          <div className={className.element('text')}>
            <div className={className.element('title')}>
              {props.title}
            </div>
            <div className={className.element('description')}>
              {props.description}
            </div>
            <div className={className.element('button')}>
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

Thumbnail.defaultProps = {
  thumbnail: 'generic'
}

export default Thumbnail
