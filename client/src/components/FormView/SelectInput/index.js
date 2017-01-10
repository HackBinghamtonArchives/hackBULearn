import React from 'react'

import './style.scss'

const SelectInput = (props) => {
  const choices = props.choices.map((choice) => {
    return <option value={choice} key={choice}>{choice}</option>
  })

  return (
    <div className='select-input'>
      <label>{props.title}</label>
      <select
        value={props.value}
        name={props.name}
        onChange={props.onChange}>
        {choices}
      </select>
      <div className='select-input__validation-error'>
        {props.error}
      </div>
    </div>
  )
}

SelectInput.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string,
  choices: React.PropTypes.array,
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  error: React.PropTypes.string
}

export default SelectInput
