import React from 'react'
import { block as BEM } from 'bem-class'

import './VideoView.scss'

export default class VideoView extends React.Component {
  static propTypes = {
    videoid: React.PropTypes.string.isRequired,
    didClickNextVideo: React.PropTypes.func,
    nextVideoAvailable: React.PropTypes.bool.isRequired
  }

  state = {}

  constructor(props) {
    super(props)
  }

  render () {
    const video_view = BEM('video_view')

    return (
      <div className={video_view}>
        <div className='embed-responsive embed-responsive-16by9'>
          <iframe className='embed-responsive-item'
                  src={'https://www.youtube.com/embed/' + this.props.videoid}
                  frameBorder='0' allowFullScreen>
          </iframe>
        </div>
        <div className={video_view.element('download_button')}>
          Download Example Files
        </div>
        <div className={video_view.element('next_video_button').modifier({
               disabled: this.props.nextVideoAvailable
             })} onClick={this.props.didClickNextVideo}>
          Next Video
        </div>
      </div>
    )
  }
}
