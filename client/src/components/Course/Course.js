import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'
import { DashboardDetail, VideoView, ActivityIndicator } from 'components'

import './Course.scss'

export default class Course extends React.Component {
  static propTypes = {
    course: React.PropTypes.object,
    fetchCourse: React.PropTypes.func.isRequired,
    addVideoToUser: React.PropTypes.func,
    fetchUserInfo: React.PropTypes.func.isRequired,
    user: React.PropTypes.object
  }

  state = {
    selection: -1
  }

  componentDidMount() {
    this.props.fetchCourse(this.props.routeParams.id)
    if(_.isEmpty(this.props.user.data)) this.props.fetchUserInfo()
  }

  constructor(props) {
    super(props)

    this.changeSelection = this.changeSelection.bind(this)
    this.goToNextVideo = this.goToNextVideo.bind(this)
    this.markVideoAsComplete = this.markVideoAsComplete.bind(this)
  }

  isLastVideo() {
    return this.state.selection == this.props.course.data.videos.length - 1
  }

  goToNextVideo() {
    if(this.isLastVideo() == false) {
      this.changeSelection(this.state.selection + 1)
    }
  }

  markVideoAsComplete() {
    const selected_video = this.props.course.data.videos[this.state.selection]
    if(this.props.user.data.videos.indexOf(selected_video._id) == -1) {
      this.props.addVideoToUser(selected_video._id)
    }
  }

  changeSelection(i) {
    this.setState({ selection: i })
  }

  renderTableViewItem(video, index, className) {
    var complete = (this.props.user.data.videos
      && this.props.user.data.videos.indexOf(video._id) != -1);

    className = className.element('item').modifier({
      complete: complete,
      active: this.state.selection == index
    })

    return (
      <div className={className} key={video._id}
           onClick={() => this.changeSelection(index)}>
        {video.title}
      </div>
    )
  }

  renderTableView() {
    const table_view = BEM('course__table_view');
    return _.map(this.props.course.data.videos, (video, i) => {
      return this.renderTableViewItem(video, i, table_view)
    })
  }

  renderVideoView() {
    if(this.state.selection != -1) {
      const selected_video = this.props.course.data.videos[this.state.selection]

      return (
        <VideoView videoid={selected_video.videoid}
                   nextVideoAvailable={this.isLastVideo()}
                   didClickNextVideo={this.goToNextVideo}
                   didCompleteVideo={this.markVideoAsComplete}/>
      )
    }
  }

  renderContent(className) {
    if(!_.isEmpty(this.props.course.data)) {
      return (
        <div>
          <div className={className.element('table_view')}>
            {this.renderTableView()}
          </div>
          <div className={className.element('media_view')}>
            {this.renderVideoView()}
          </div>
        </div>
      )
    }
  }

  renderActivityIndicator(className) {
    if(_.isEmpty(this.props.course.data)) {
      return (
        <div className={className.element('activity_indicator')}>
          <ActivityIndicator />
        </div>
      )
    }
  }

  render() {
    const course = BEM('course')
    return (
      <DashboardDetail title='Courses' icon='folder-open-o'
                       breadcrumb={this.props.course.data.title}
                       rootPath='/courses'>
        {this.renderActivityIndicator(course)}
        {this.renderContent(course)}
      </DashboardDetail>
    )
  }
}
