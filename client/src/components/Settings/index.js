import React from 'react'

import ActivityIndicator from 'components/ActivityIndicator'
import DashboardDetail from 'components/DashboardDetail'
import FormView from 'components/FormView'

import './style.scss'

export default class Settings extends React.Component {
  static propTypes = {
    users: React.PropTypes.shape({
      local: React.PropTypes.shape({
        username: React.PropTypes.string,
        firstname: React.PropTypes.string,
        lastname: React.PropTypes.string,
        email: React.PropTypes.string
      })
    }),
    fetchUser: React.PropTypes.func.isRequired,
    saveUser: React.PropTypes.func.isRequired
  }

  state = {
    user: null,
    saved: true
  }

  componentDidMount() {
    console.log("MOUNTING")
    this.props.fetchUser('me')
  }

  componentWillReceiveProps(nextProps) {
    if(!_.isEmpty(nextProps.users.data) && !_.isNil(nextProps.users.me)) {
      const user = Object.assign({}, nextProps.users.data[nextProps.users.me])
      user._id = 'me'

      this.setState({
        user,
        saved: true
      })
    }
  }

  constructor(props) {
    super(props)

    this.onEdit = this.onEdit.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  onEdit(e) {
    var user = _.cloneDeep(this.state.user)
    _.set(user, e.target.name, e.target.value)
    this.setState({ user, saved: false })
  }

  onSave() {
    this.props.saveUser(this.state.user)
  }

  render() {
    const activityIndicator = this.props.users.isFetching && (
      <div className='settings__activity-indicator'>
        <ActivityIndicator />
      </div>
    )

    const form = !this.props.users.isFetching && (
      <div className='settings__form'>
        <FormView
          data={ this.state.user }
          error={ this.props.users.error }
          onChange={ this.onEdit }
          onSubmit={ this.onSave }
          disableSubmit={ this.state.saved } >
          <FormView.TextInput title='Username' name='local.username' />
          <FormView.TextInput title='First Name' name='local.firstname' />
          <FormView.TextInput title='Last Name' name='local.lastname' />
          <FormView.TextInput title='Email Address' name='local.email' />
        </FormView>
      </div>
    )

    return (
      <DashboardDetail title='Settings' icon='gear'>
        { activityIndicator }
        { form }
      </DashboardDetail>
    )
  }
}
