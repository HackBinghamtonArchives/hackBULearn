import React from 'react'
import { block as BEM } from 'bem-class'
import YouTube from 'react-youtube'
import _ from 'lodash'

import './style.scss'

const VideoView = (props) => {
  const videoChangeHandler = (state) => {
    if(state.data === 0) return props.didCompleteVideo()
  }

  const downloadHandler = () => {
    window.open(props.exampleFilesUrl)
  }

  const classes = BEM('video-view')

  const downloadButton = (!_.isEmpty(props.exampleFilesUrl)) && (
    <div className={ classes.element('download-button') }
      onClick={ downloadHandler }>
      Download Example Files
    </div>
  )

  const nextVideoButton = (
    <div className={ classes.element('next-video-button').modifier({
        disabled: props.nextVideoAvailable
      }) } onClick={ props.didClickNextVideo }>
      Next Video
    </div>
  )

  return (
    <div className={ classes }>
      <div className='embed-responsive embed-responsive-16by9'>
        <YouTube videoId={ props.videoid }
          onStateChange={ videoChangeHandler } />
      </div>
      { downloadButton }
      { nextVideoButton }
    </div>
  )
}

VideoView.propTypes = {
  videoid: React.PropTypes.string.isRequired,
  didClickNextVideo: React.PropTypes.func,
  nextVideoAvailable: React.PropTypes.bool.isRequired,
  didCompleteVideo: React.PropTypes.func,
  exampleFilesUrl: React.PropTypes.string
}

export default VideoView
