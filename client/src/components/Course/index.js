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
    fetchUser: React.PropTypes.func.isRequired,
    saveUser: React.PropTypes.func.isRequired,
    users: React.PropTypes.shape({
      data: React.PropTypes.object,
      isFetching: React.PropTypes.bool.isRequired,
      caughtError: React.PropTypes.bool.isRequired,
      me: React.PropTypes.string
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
    if(_.isNil(this.props.users.me)) this.props.fetchUser('me')
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
    const currentUser = this.props.users.data[this.props.users.me]
    if(currentUser.videos.indexOf(selected_video._id) == -1) {
      const user = _.cloneDeep(currentUser)
      user._id = 'me'
      user.videos.push(selected_video._id)
      this.props.saveUser(_.pick(user, ['_id', 'videos']))
    }
  }

  changeSelection(i) {
    this.setState({ selection: i })
  }

  renderContent(course, className) {
    if(!_.isEmpty(course) && !this.props.courses.isFetching
      && !_.isEmpty(this.props.users.data) && !_.isNil(this.props.users.me)
      && course.cached == true) {
      const currentUser = this.props.users.data[this.props.users.me]
      const subviews = course.videos.map((video) => {
        const isComplete = (currentUser.videos.indexOf(video._id) != -1)
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
            exampleFilesUrl={video.exampleFilesUrl}
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
          <div className={ className.element('table-view') }>
            {this.renderTableView(course)}
          </div>
          <div className={ className.element('media-view') }>
            { this.renderVideoView(course) }
          </div>
        </div>
      )
    }
  }

  renderActivityIndicator(className) {
    if(this.props.courses.isFetching) {
      return (
        <div className={className.element('activity-indicator')}>
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
