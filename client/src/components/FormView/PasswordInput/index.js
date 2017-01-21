import React from 'react'

import './style.scss'

const PasswordInput = (props) => {
  return (
    <div className='password-input'>
      <label>{props.title}</label>
      <input
        type='password'
        name={props.name}
        value={props.value}
        onChange={props.onChange} />
      <div className='password-input__validation-error'>
        {props.error}
      </div>
    </div>
  )
}

PasswordInput.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.string,
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  error: React.PropTypes.string
}

PasswordInput.defaultProps = {
  value: ''
}

export default PasswordInput
