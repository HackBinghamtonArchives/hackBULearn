import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'

import ActivityIndicator from 'components/ActivityIndicator'
import DashboardDetail from 'components/DashboardDetail'
import TableView from 'components/TableView'
import SplitView from 'components/SplitView'
import VideoView from 'components/VideoView'

import './style.scss'

class Course extends React.Component {
  static propTypes = {
    fetchCourse: React.PropTypes.func.isRequired,
    addVideoToUser: React.PropTypes.func,
    fetchUserInfo: React.PropTypes.func.isRequired,
    user: React.PropTypes.shape({
      data: React.PropTypes.shape({
        videos: React.PropTypes.arrayOf(React.PropTypes.string)
      })
    }),
    courses: React.PropTypes.object
  }

  state = {
    selection: -1
  }

  fetchCourseIfNeeded() {
    const course = this.props.courses.data[this.props.routeParams.id]
    if(course && course.cached) return
    this.props.fetchCourse(this.props.routeParams.id)
  }

  fetchUserInfoIfNeeded() {
    if(_.isEmpty(this.props.user.data)) this.props.fetchUserInfo()
  }

  componentDidMount() {
    this.fetchCourseIfNeeded()
    this.fetchUserInfoIfNeeded()
  }

  constructor(props) {
    super(props)

    this.changeSelection = this.changeSelection.bind(this)
    this.goToNextVideo = this.goToNextVideo.bind(this)
    this.markVideoAsComplete = this.markVideoAsComplete.bind(this)
  }

  isLastVideo(course) {
    return this.state.selection == course.videos.length - 1
  }

  goToNextVideo(course) {
    if(this.isLastVideo(course) == false) {
      this.changeSelection(this.state.selection + 1)
    }
  }

  markVideoAsComplete(course) {
    const selected_video = course.videos[this.state.selection]
    if(this.props.user.data.videos.indexOf(selected_video._id) == -1) {
      this.props.addVideoToUser(selected_video._id)
    }
  }

  changeSelection(i) {
    this.setState({ selection: i })
  }

  renderContent(course, className) {
    if(!_.isEmpty(course) && !this.props.courses.isFetching
      && !_.isEmpty(this.props.user.data) && course.cached == true) {
      const subviews = course.videos.map((video) => {
        const isComplete = (this.props.user.data.videos.indexOf(video._id) != -1)
        const iconType = isComplete ? 'check-circle' : 'circle-o'
        const iconStyle = isComplete ? 'success' : 'default'

        return {
          title: video.title,
          icon: {
            type: iconType,
            style: iconStyle
          }
        }
      })

      const content = course.videos.map((video) => {
        return (
          <VideoView
            key={video._id}
            videoid={video.videoid}
            nextVideoAvailable={ this.isLastVideo(course) }
            didClickNextVideo={ () => this.goToNextVideo(course) }
            didCompleteVideo={ () => this.markVideoAsComplete(course) } />
        )
      })

      return (
        <SplitView
          subviews={ subviews }
          onChange={ this.changeSelection }
          activeView={ this.state.selection }>
          { content }
        </SplitView>
      )

      return (
        <div>
          <div className={ className.element('table_view') }>
            {this.renderTableView(course)}
          </div>
          <div className={ className.element('media_view') }>
            { this.renderVideoView(course) }
          </div>
        </div>
      )
    }
  }

  renderActivityIndicator(className) {
    if(this.props.courses.isFetching) {
      return (
        <div className={className.element('activity_indicator')}>
          <ActivityIndicator />
        </div>
      )
    }
  }

  render() {
    const className = BEM('course')
    const id = this.props.routeParams.id
    const course = this.props.courses.data[id]
    const title = (course) ? course.title : ''

    return (
      <DashboardDetail title='Courses' icon='folder-open-o'
        breadcrumb={title}
        rootPath='/courses'>
          {this.renderActivityIndicator(className)}
          {this.renderContent(course, className)}
      </DashboardDetail>
    )
  }
}

export default Course
