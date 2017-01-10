import React from 'react'

import './style.scss'

const NumberInput = (props) => {
  return (
    <div className='text-input'>
      <label>{props.title}</label>
      <input
        type='number'
        name={props.name}
        value={props.value}
        onChange={props.onChange} />
      <div className='text-input__validation-error'>
        {props.error}
      </div>
    </div>
  )
}

NumberInput.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.number,
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  error: React.PropTypes.string
}

export default NumberInput
