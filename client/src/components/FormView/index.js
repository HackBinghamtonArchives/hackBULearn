import React from 'react'
import _ from 'lodash'
import classNames from 'classnames'

import TextInput from './TextInput'
import SelectInput from './SelectInput'
import DateInput from './DateInput'
import NumberInput from './NumberInput'

import './style.scss'

const FormView = (props) => {
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
    <div className={submitButtonClasses} onClick={props.onSubmit}>
      Submit
    </div>
  )

  return (
    <div className='form-view'>
      <div className='form-view__fields-container'>{children}</div>
      {submitButton}
    </div>
  )
}

FormView.propTypes = {
  onChange: React.PropTypes.func,
  onSubmit: React.PropTypes.func,
  children: React.PropTypes.node,
  data: React.PropTypes.object,
  error: React.PropTypes.object,
  disableSubmit: React.PropTypes.bool
}

FormView.defaultProps = {
  disableSubmit: false
}

FormView.TextInput = TextInput
FormView.SelectInput = SelectInput
FormView.DateInput = DateInput
FormView.NumberInput = NumberInput

export default FormView
