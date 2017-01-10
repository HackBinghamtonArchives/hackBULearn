import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'

import './style.scss'

const DataView = (props) => {
  const className = BEM('data-view')

  const headers = props.columns.map((column) => {
    return <th key={column}>{column}</th>
  })

  const rows = Object.keys(props.data).map((id) => {
    const row = props.data[id]
    const cells = row.map((cell, i) => <td key={`cell.${id}.${i}`}>{cell}</td>)
    return (
      <tr key={`row.${id}`}>
        {cells}
        <td className={className.element('row-buttons')}>
          <div
            className={className.element('row-button').modifier('edit')}
            onClick={() => props.onEdit(id)}>
          </div>
          <div
            className={className.element('row-button').modifier('delete')}
            onClick={() => props.onDelete(id)}>
          </div>
        </td>
      </tr>)
  })

  return (
    <table className={className}>
      <thead>
        <tr>
          {headers}
          <th></th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}

DataView.propTypes = {
  columns: React.PropTypes.array.isRequired,
  data: React.PropTypes.object,
  onEdit: React.PropTypes.func,
  onDelete: React.PropTypes.func
}

DataView.defaultProps = {
  data: {}
}

export default DataView
