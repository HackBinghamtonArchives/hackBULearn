import React from 'react'
import classNames from 'classnames'

import Item from './Item'
import './style.scss'

const TableView = (props) => {
  const items = props.children.map((item) => {
    const isActive = (props.activeItem === item.props.itemId)
    return React.cloneElement(item, { isActive })
  })

  return (
    <div className='table-view'>
      { items }
    </div>
  )
}

TableView.propTypes = {
  children: React.PropTypes.node
}

TableView.Item = Item

export default TableView
