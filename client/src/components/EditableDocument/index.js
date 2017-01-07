import React from 'react'
import _ from 'lodash'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { block as BEM } from 'bem-class'

import './style.scss'

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
    this.setState({ row: _.cloneDeep(this.props.row) })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ row: _.cloneDeep(nextProps.row), saved: true })
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
    const newRow = _.set(this.state.row, column, newData)
    this.setState({ row: newRow, saved: false })
  }

  resetData() {
    this.setState({ row: _.cloneDeep(this.props.row), saved: true })
  }

  renderCell(title, options, className) {
    var input;
    switch(options.type) {
      case 'date':
        input = (
          <div className={className.element('cell_data').modifier('date')}>
            <DatePicker
              selected={moment(_.get(this.state.row, options.key))}
              onChange={(date) => this.changeData(options.key, date)} />
          </div>
        )
        break
      case 'select':
        const choices = options.choices.map((choice) => {
          return <option value={choice} key={choice}>{choice}</option>
        })

        input = (
          <select
            className={className.element('cell_data').modifier('select')}
            value={_.get(this.state.row, options.key)}
            onChange={(e) => this.changeData(options.key, e.target.value)}>
            {choices}
          </select>
        )
        break
      default:
        input = (
          <input
            type='text'
            className={className.element('cell_data').modifier('text')}
            value={_.get(this.state.row, options.key)}
            onChange={(e) => this.changeData(options.key, e.target.value)} />
        )
    }

    return (
      <div className={className.element('cell')} key={title}>
        <div className={className.element('cell_header')}>
          {title}
        </div>
        {input}
      </div>
    )
  }

  renderCells(className) {
    if(this.state.row) {
      const cells = Object.keys(this.props.columns).map((column) => {
        const options = this.props.columns[column]
        return this.renderCell(column, options, className)
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
