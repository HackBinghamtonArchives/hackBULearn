import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'

import './EditableDocument.scss'

export default class EditableDocument extends React.Component {
  static propTypes = {
    row: React.PropTypes.object.isRequired,
    columns: React.PropTypes.object.isRequired,
    updateDocument: React.PropTypes.func,
    deleteDocument: React.PropTypes.func
  }

  state = {
    saved: true
  }

  componentDidMount() {
    this.setState({ row: _.clone(this.props.row) })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ row: _.clone(nextProps.row), saved: true })
  }

  constructor(props) {
    super(props)

    this.changeData = this.changeData.bind(this)
    this.resetData = this.resetData.bind(this)
    this.updateData = this.updateData.bind(this)
    this.deleteData = this.deleteData.bind(this)
  }

  updateData() {
    if(this.state.saved == false) this.props.updateDocument(this.state.row)
  }

  deleteData() {
    this.props.deleteDocument(this.state.row)
  }

  changeData(column, newData) {
    const newState = _.set(this.state.row, column, newData)
    newState.saved = false
    this.setState(newState)
  }

  resetData() {
    this.setState({ row: _.clone(this.props.row), saved: true })
  }

  renderCell(key, header, data, className) {
    return (
      <div className={className.element('cell')} key={header}>
        <div className={className.element('cell_header')}>
          {header}
        </div>
        <input type='text' className={className.element('cell_data')}
          value={data} onChange={(e) => this.changeData(key, e.target.value)} />
      </div>
    )
  }

  renderCells(className) {
    if(this.state.row) {
      const cells = Object.keys(this.props.columns).map((column) => {
        const key = this.props.columns[column]
        const data = _.get(this.state.row, key)
        return this.renderCell(key, column, data, className)
      })

      return (
        <div className={className.element('cells')}>
          {cells}
        </div>
      )
    }
  }

  renderButtons(className) {
    return (
      <div className={className.element('buttons')}>
        <div className={className.element('button').modifier({
          'save': true,
          'disabled': this.state.saved
        })} title='Save' onClick={this.updateData}></div>

        <div className={className.element('button').modifier({
          'undo': true,
          'disabled': this.state.saved
        })} title='Undo' onClick={this.resetData}></div>

        <div className={className.element('button').modifier('delete')}
          title='Delete' onClick={this.deleteData}></div>
      </div>
    )
  }

  render() {
    const editable_document = BEM('editable_document')

    return (
      <div className={editable_document}>
        {this.renderCells(editable_document)}
        {this.renderButtons(editable_document)}
      </div>
    )
  }
}
