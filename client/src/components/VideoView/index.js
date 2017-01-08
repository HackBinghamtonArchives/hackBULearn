import React from 'react'
import { block as BEM } from 'bem-class'
import YouTube from 'react-youtube'

import './style.scss'

export default class VideoView extends React.Component {
  static propTypes = {
    videoid: React.PropTypes.string.isRequired,
    didClickNextVideo: React.PropTypes.func,
    nextVideoAvailable: React.PropTypes.bool.isRequired,
    didCompleteVideo: React.PropTypes.func
  }

  state = {}

  constructor(props) {
    super(props)

    this.videoStateChanged = this.videoStateChanged.bind(this)
  }

  videoStateChanged(state) {
    if(state.data === 0) return this.props.didCompleteVideo()
  }

  render () {
    const className = BEM('video-view')

    return (
      <div className={className}>
        <div className='embed-responsive embed-responsive-16by9'>
        <YouTube videoId={this.props.videoid}
          onStateChange={this.videoStateChanged} />
        </div>
        <div className={className.element('download-button')}>
          Download Example Files
        </div>
        <div className={className.element('next-video-button').modifier({
            disabled: this.props.nextVideoAvailable
          })} onClick={this.props.didClickNextVideo}>
          Next Video
        </div>
      </div>
    )
  }
}
