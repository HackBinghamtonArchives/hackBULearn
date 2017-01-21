import React from 'react'
import { block as BEM } from 'bem-class'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'

import ActivityIndicator from 'components/ActivityIndicator'
import FormView from 'components/FormView'

import './style.scss'

export default class LoginForm extends React.Component {
  static propTypes = {}

  state = {
    user: {
      local: {
        username: '',
        password: '',
        email: '',
        firstname: '',
        lastname: ''
      }
    },
    isFetching: false,
    currentForm: 'login',
    error: null
  }

  constructor(props) {
    super(props)

    this.onSubmit = this.onSubmit.bind(this)
    this.onSwitchForm = this.onSwitchForm.bind(this)
    this.onEdit = this.onEdit.bind(this)
  }

  onSuccess(json) {
    window.location.href = '/dashboard'
  }

  onError(err) {
    this.setState({ error: err, isFetching: false })
  }

  onSubmit() {
    const route = (this.state.currentForm == 'login') ? 'session' : 'users/me'

    const options = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state.user)
    }

    this.setState({ isFetching: true })
    var that = this

    return fetch(`/api/${route}`, options)
      .then((response) => {
        if(response.ok) {
          response.json()
            .then(json => that.onSuccess(json))
        } else {
          response.json()
            .then(json => that.onError(json))
        }
      })
      .catch((error) => that.onError(error))
  }

  onSwitchForm() {
    if(this.state.currentForm == 'login') {
      this.setState({ currentForm: 'signup', error: null })
    } else {
      this.setState({ currentForm: 'login', error: null })
    }
  }

  onEdit(e) {
    var user = _.cloneDeep(this.state.user)
    _.set(user, e.target.name, e.target.value)
    this.setState({ user })
  }

  renderActivityIndicator(className) {
    return this.state.isFetching && (
      <div className={className.element('activity-indicator')}>
        <ActivityIndicator />
      </div>
    )
  }

  renderHeader(className) {
    return <div className={className.element('logo')}></div>
  }

  renderError() {
    return !_.isNil(this.state.error) && !_.isNil(this.state.error.message) && (
      <div className='alert alert-danger'>
        { this.state.error.message }
      </div>
    )
  }

  renderLoginForm(className) {
    if(this.state.isFetching == false && this.state.currentForm == 'login') {
      return (
        <div className={className.element('fields').modifier('signup')}>
          { this.renderHeader(className) }
          { this.renderError() }
          <FormView
            data={this.state.user}
            error={ this.state.error }
            onChange={ this.onEdit }
            onSubmit={ this.onSubmit }
            submitText='Login'>
            <FormView.TextInput title='Username' name='local.username' />
            <FormView.PasswordInput title='Password' name='local.password' />
          </FormView>
        </div>
      )
    }
  }

  renderSignupForm(className) {
    if(this.state.isFetching == false && this.state.currentForm == 'signup') {
      return (
        <div className={className.element('fields').modifier('signup')}>
          { this.renderHeader(className) }
          { this.renderError() }
          <FormView
            data={this.state.user}
            error={ this.state.error }
            onChange={ this.onEdit }
            onSubmit={ this.onSubmit }
            submitText='Register'>
            <FormView.TextInput title='First Name' name='local.firstname' />
            <FormView.TextInput title='Last Name' name='local.lastname' />
            <FormView.TextInput title='Email Address' name='local.email' />
            <FormView.TextInput title='Username' name='local.username' />
            <FormView.PasswordInput title='Password' name='local.password' />
          </FormView>
        </div>
      )
    }
  }

  renderSwitchLink(className) {
    if(this.state.isFetching == false) {
      if(this.state.currentForm == 'login') {
        return (
          <div className={className.element('switch-link')}>
            Don&#39;t have an account? <b onClick={this.onSwitchForm}>Sign Up</b>
          </div>
        )
      } else {
        return (
          <div className={className.element('switch-link')}>
            Already have an account? <b onClick={this.onSwitchForm}>Log In</b>
          </div>
        )
      }
    }
  }

  render() {
    const className = BEM('auth-form')

    return (
      <div className={className}>
        {this.renderActivityIndicator(className)}
        {this.renderLoginForm(className)}
        {this.renderSignupForm(className)}
        {this.renderSwitchLink(className)}
      </div>
    )
  }
}
