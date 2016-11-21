import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'
import { DashboardDetail, VideoView, ActivityIndicator } from 'components'

import './Course.scss'

export default class Course extends React.Component {
  static propTypes = {
    course: React.PropTypes.object,
    fetchCourse: React.PropTypes.func
  }

  state = {
    selection: -1
  }

  componentDidMount() {
    this.props.fetchCourse(this.props.routeParams.id)
  }

  constructor(props) {
    super(props)

    this.changeSelection = this.changeSelection.bind(this)
    this.goToNextVideo = this.goToNextVideo.bind(this)
  }

  isLastVideo() {
    return this.state.selection == _.last(this.props.course.data.videos)._id
  }

  goToNextVideo() {
    if(this.isLastVideo() == false) {
      this.changeSelection(this.state.selection + 1)
    }
  }

  changeSelection(i) {
    this.setState({ selection: i })
  }

  renderTableViewItem(video, className) {
    className = className.element('item').modifier({
      complete: false,
      active: (video._id == this.state.selection)
    })

    return (
      <div className={className} key={video._id}
           onClick={() => this.changeSelection(video._id)}>
        {video.title}
      </div>
    )
  }

  renderTableView() {
    const table_view = BEM('course__table_view');
    return _.map(this.props.course.data.videos, (video) => {
      return this.renderTableViewItem(video, table_view)
    })
  }

  renderVideoView() {
    if(this.state.selection != -1) {
      const selected_video = _.find(this.props.course.data.videos, (video) => {
        return video._id == this.state.selection
      })

      return (
        <VideoView videoid={selected_video.videoid}
                   nextVideoAvailable={this.isLastVideo()}
                   didClickNextVideo={this.goToNextVideo}/>
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
