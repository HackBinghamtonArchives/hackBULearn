import React from 'react'
import classNames from 'classnames'
import _ from 'lodash'

import './style.scss'

const Item = (props) => {
  const tableItemClasses = classNames('table-view__item', {
    'table-view__item--with-icon': !_.isNil(props.icon),
    'table-view__item--active': props.isActive
  })

  return (
    <div className={ tableItemClasses } onClick={ props.onClick }>
      { props.icon &&
        <div className={`fa fa-${props.icon.type} fa--${props.icon.style}`}>
        </div>
      }
      { props.title }
    </div>
  )
}

Item.propTypes = {
  icon: React.PropTypes.shape({
    type: React.PropTypes.string.isRequired,
    style: React.PropTypes.oneOf([
      'success', 'danger', 'default'
    ])
  }),
  title: React.PropTypes.string.isRequired,
  isActive: React.PropTypes.bool
}

export default Item
