import React from 'react'
import _ from 'lodash'

import TextInput from '../TextInput'

import './style.scss'

const VideoInput = (props) => {
  const changeHandler = (e) => {
    const value = _.cloneDeep(props.value)
    value[e.target.name] = e.target.value
    props.onChange({
      target: { value: value, name: props.name }
    })
  }

  const titleInput = (
    <div className='video-input__title-input'>
      <TextInput
        title='Video Title'
        value={ props.value.title }
        name='title'
        onChange={ changeHandler } />
    </div>
  )

  const videoIdInput = (
    <div className='video-input__video-id-input'>
      <TextInput
        title='YouTube ID'
        value={ props.value.videoid }
        name='videoid'
        onChange={ changeHandler } />
    </div>
  )

  const exampleFileInput = (
    <div className='video-input__example-file-input'>
      <TextInput
        title='Example Files URL'
        value={ props.value.exampleFilesUrl }
        name='exampleFilesUrl'
        onChange={ changeHandler } />
    </div>
  )

  const validationError = (
    <div className='video-input__validation-error'>
      { props.error }
    </div>
  )

  return (
    <div className='video-input'>
      <div className='video-input__input-container'>
        { titleInput }
        { videoIdInput }
        { exampleFileInput }
      </div>
      { validationError }
    </div>
  )
}

VideoInput.propTypes = {
  onChange: React.PropTypes.func,
  value: React.PropTypes.shape({
    _id: React.PropTypes.string,
    title: React.PropTypes.string,
    videoid: React.PropTypes.string,
    exampleFilesUrl: React.PropTypes.string
  }),
  name: React.PropTypes.string.isRequired,
  error: React.PropTypes.string
}

VideoInput.defaultProps = {
  value: {
    title: '',
    videoid: '',
    exampleFilesUrl: ''
  }
}

export default VideoInput
