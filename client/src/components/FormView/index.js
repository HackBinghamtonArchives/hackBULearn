import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

import TextInput from './TextInput'
import SelectInput from './SelectInput'
import DateInput from './DateInput'
import NumberInput from './NumberInput'
import VideoInput from './VideoInput'
import CollectionInput from './CollectionInput'
import PasswordInput from './PasswordInput'

import './style.scss'

const FormView = (props) => {
  const keyPressHandler = (e) => {
    if(e.key === 'Enter') return props.onSubmit()
  }

  const children = props.children.map((child, i) => {
    return React.cloneElement(child, {
      onChange: props.onChange,
      value: _.get(props.data, child.props.name),
      key: i,
      error: _.get(props.error, `errors['${child.props.name}'].message`)
    })
  })

  const submitButtonClasses = classNames({
    'form-view__submit-button': true,
    'form-view__submit-button--disabled': props.disableSubmit
  })

  const submitButton = (
    <div className={ submitButtonClasses } onClick={props.onSubmit}>
      { props.submitText }
    </div>
  )

  return (
    <div className='form-view' onKeyPress={ keyPressHandler }>
      <div className='form-view__fields-container'>{ children }</div>
      { submitButton }
    </div>
  )
}

FormView.propTypes = {
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  children: React.PropTypes.node,
  data: React.PropTypes.object,
  error: React.PropTypes.object,
  disableSubmit: React.PropTypes.bool,
  submitText: React.PropTypes.string
}

FormView.defaultProps = {
  disableSubmit: false,
  submitText: 'Submit'
}

FormView.TextInput = TextInput
FormView.SelectInput = SelectInput
FormView.DateInput = DateInput
FormView.NumberInput = NumberInput
FormView.VideoInput = VideoInput
FormView.CollectionInput = CollectionInput
FormView.PasswordInput = PasswordInput

export default FormView
