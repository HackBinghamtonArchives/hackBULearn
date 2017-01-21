import React from 'react'
import _ from 'lodash'
import { block as BEM } from 'bem-class'

import './style.scss'

const CollectionInput = (props) => {
  // Handler for input changes
  const changeHandler = (e) => {
    const value = _.cloneDeep(props.value)
    value[e.target.name] = e.target.value
    props.onChange({
      target: { value: value, name: props.name }
    })
  }

  // Handler for rearranging items
  const moveUpHandler = (i) => {
    if(i <= 0) return
    const element = props.value[i]
    const value = _.cloneDeep(props.value)
    value[i] = value[i - 1]
    value[i - 1] = element
    props.onChange({
      target: { value: value, name: props.name }
    })
  }

  // Handler for rearranging items
  const moveDownHandler = (i) => {
    if(i >= props.value.length - 1) return
    const element = props.value[i]
    const value = _.cloneDeep(props.value)
    value[i] = value[i + 1]
    value[i + 1] = element
    props.onChange({
      target: { value: value, name: props.name }
    })
  }


  // Handler for deleting an item
  const deleteHandler = (id) => {
    const value = _.cloneDeep(props.value)
    props.onChange({
      target: {
        value: _.reject(value, ['_id', id]),
        name: props.name
      }
    })
  }

  // Handler for inserting an item
  const insertHandler = () => {
    const value = _.cloneDeep(props.value)
    value.push({ _id: _.uniqueId('new-item') })
    props.onChange({
      target: { value: value, name: props.name }
    })
  }

  // Render inputs and buttons for each item
  const items = _.values(props.value).map((item, i) => {
    const Input = props.input

    const classRoot = BEM('collection-input')
    const buttons = (
      <div className='collection-input__buttons'>
        <div
          className={ classRoot.element('button').modifier('up') }
          onClick={ () => moveUpHandler(i) }>
        </div>
        <div
          className={ classRoot.element('button').modifier('down') }
          onClick={ () => moveDownHandler(i) }>
        </div>
        <div
          className={ classRoot.element('button').modifier('delete') }
          onClick={ () => deleteHandler(item._id) }>
        </div>
      </div>
    )

    return (
      <div className='collection-input__item-container' key={ item._id }>
        <div className='collection-input__item'>
          <Input
            name={ i.toString() }
            value={ item }
            onChange={ changeHandler } />
          { buttons }
        </div>
      </div>
    )
  })

  return (
    <div className='collection-input'>
      <label className='collection-input__title'>
        { props.title }
      </label>

      { items }

      <div
        className='collection-input__insert-button'
        onClick={ insertHandler }>
        New Item
      </div>
    </div>
  )
}

CollectionInput.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.array,
  name: React.PropTypes.string.isRequired,
  title: React.PropTypes.string.isRequired,
  error: React.PropTypes.string
}

CollectionInput.defaultProps = {
  value: []
}

export default CollectionInput
