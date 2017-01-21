import React from 'react'
import { block as BEM } from 'bem-class'

import './style.scss'

const PopupView = (props) => {
  const className = BEM('popup-view')

  return (
    <div className={className}>
      <div className={className.element('container')}>
        <div className={className.element('title')}>
          {props.title}
          <div
            className={className.element('close-button')}
            onClick={props.onClose}>
          </div>
        </div>
        <div className={className.element('content')}>
          {props.children}
        </div>
      </div>
    </div>
  )
}

PopupView.propTypes = {
  title: React.PropTypes.string,
  children: React.PropTypes.node,
  onClose: React.PropTypes.func
}

export default PopupView
