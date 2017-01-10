import React from 'react'

import './style.scss'

const TextInput = (props) => {
  return (
    <div className='text-input'>
      <label>{props.title}</label>
      <input
        type='text'
        name={props.name}
        value={props.value}
        onChange={props.onChange} />
      <div className='text-input__validation-error'>
        {props.error}
      </div>
    </div>
  )
}

TextInput.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  error: React.PropTypes.string
}

export default TextInput
