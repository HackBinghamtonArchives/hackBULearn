import React from 'react'
import _ from 'lodash'

import ActivityIndicator from 'components/ActivityIndicator'
import DataView from 'components/DataView'
import PopupView from 'components/PopupView'
import FormView from 'components/FormView'

import './style.scss'

export default class UsersList extends React.Component {
  static propTypes = {
    fetchUsers: React.PropTypes.func.isRequired,
    deleteUser: React.PropTypes.func.isRequired,
    users: React.PropTypes.object.isRequired
  }

  state = {
    userBeingEdited: false
  }

  componentDidMount() {
    this.props.fetchUsers();
  }

  constructor(props) {
    super(props)

    this.enableEditor = this.enableEditor.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.handleSave = this.handleSave.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  enableEditor(id) {
    this.setState({
      userBeingEdited: _.cloneDeep(this.props.users.data[id])
    })
  }

  handleEdit(e) {
    const userBeingEdited = _.cloneDeep(this.state.userBeingEdited)
    _.set(userBeingEdited, e.target.name, e.target.value)
    this.setState({ userBeingEdited })
  }

  handleSave() {
    if(this.state.userBeingEdited) {
      this.props.saveUser(this.state.userBeingEdited)
    }
  }

  handleClose() {
    this.setState({ userBeingEdited: null })
  }

  deleteUser(id) {
    this.props.deleteUser({ _id: id })
  }

  renderEditorPopup() {
    if(this.state.userBeingEdited) {
      return (
        <PopupView title='Edit User' onClose={ this.handleClose }>
          <FormView
            data={ this.state.userBeingEdited }
            error={ this.props.users.error }
            onChange={ this.handleEdit }
            onSubmit={ this.handleSave }>
            <FormView.TextInput title='Username' name='local.username' />
            <FormView.TextInput title='First Name' name='local.firstname' />
            <FormView.TextInput title='Last Name' name='local.lastname' />
            <FormView.TextInput title='Email Address' name='local.email' />
          </FormView>
        </PopupView>
      )
    }
  }

  render() {
    if(this.props.users.isFetching) {
      return (
        <div className='users-editor__activity-indicator'>
          <ActivityIndicator />
        </div>
      )
    }

    const columns = ['First Name', 'Last Name', 'Username', 'Email Address']

    const data = _.mapValues(this.props.users.data, (user) => {
      return [
        user.local.firstname,
        user.local.lastname,
        user.local.username,
        user.local.email
      ]
    })

    return (
      <div className='users-editor'>
        {this.renderEditorPopup()}
        <DataView
          columns={columns}
          data={data}
          onEdit={this.enableEditor}
          onDelete={this.deleteUser}
          disabled={true} />
      </div>
    )
  }
}
