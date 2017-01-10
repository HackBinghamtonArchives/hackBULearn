import React from 'react'

import './style.scss'

export default class DateInput extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func,
    value: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    title: React.PropTypes.string.isRequired,
    error: React.PropTypes.string
  }

  constructor(props) {
    super(props)

    this.onChangeYear = this.onChangeYear.bind(this)
    this.onChangeMonth = this.onChangeMonth.bind(this)
    this.onChangeDay = this.onChangeDay.bind(this)
  }

  onChangeYear(e, value) {
    value.setYear(e.target.value)
    this.props.onChange({
      target: { value: value.toISOString(), name: this.props.name }
    })
  }

  onChangeMonth(e, value) {
    value.setMonth(e.target.value - 1)
    this.props.onChange({
      target: { value: value.toISOString(), name: this.props.name }
    })
  }

  onChangeDay(e, value) {
    value.setDate(e.target.value)
    this.props.onChange({
      target: { value: value.toISOString(), name: this.props.name }
    })
  }

  renderYearPicker(value) {
    return (
      <input
        type='number'
        min='1995'
        value={value.getFullYear()}
        onChange={(e) => this.onChangeYear(e, value)} />
    )
  }

  renderMonthPicker(value) {
    return (
      <input
        type='number'
        min='1'
        max='12'
        value={value.getMonth() + 1}
        onChange={(e) => this.onChangeMonth(e, value)} />
    )
  }

  renderDayPicker(value) {
    return (
      <input
        type='number'
        min='1'
        max={new Date(value.getFullYear(), value.getMonth() + 1, 0).getDate()}
        value={value.getDate()}
        onChange={(e) => this.onChangeDay(e, value)} />
    )
  }

  render() {
    const value = new Date(this.props.value)

    return (
      <div className='date-input'>
        <label>{this.props.title}</label>
        <div className='date-input__field-container'>
          {this.renderMonthPicker(value)}
          {this.renderDayPicker(value)}
          {this.renderYearPicker(value)}
        </div>
        <div className='date-input__validation-error'>
          {this.props.error}
        </div>
      </div>
    )
  }
}
