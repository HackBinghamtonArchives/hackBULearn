import React from 'react'
import { block as BEM } from 'bem-class'
import fetch from 'isomorphic-fetch'

import { Panel } from 'components'

import './LoginForm.scss'

export default class LoginForm extends React.Component {
  static propTypes = {}

  state = {
    username: '',
    password: ''
  }

  constructor(props) {
    super(props)

    this.onUsernameChange = this.onUsernameChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.login = this.login.bind(this)
  }

  onUsernameChange(e) {
    this.state.username = e.target.value
  }

  onPasswordChange(e) {
    this.state.password = e.target.value
  }

  login() {
    fetch('/users/login', {
      user: this.state.username,
      pass: this.state.password
    }).then((response) => response.json())
  }

  render() {
    const login_form = BEM('login_form')

    return (
      <div className={login_form}>
        <div className={login_form.element('title')}>
          Login
        </div>
        <div className={login_form.element('subtitle')}>
          Please enter your information below
        </div>
        <div className={login_form.element('content')}>
          <input type='text'
                 placeholder='Username'
                 onKeyDown={this.onUsernameChange} />
          <input type='password'
                 placeholder='Password'
                 onKeyDown={this.onPasswordChange} />
        </div>
        <div className={login_form.element('buttons')}>
          <a className={login_form.element('button').modifier('login')} href='#'
             onClick={this.login}>
            Login
          </a>
        </div>
        <div className={login_form.element('buttons')}>
          <a className={login_form.element('button').modifier('signup')} href='#'>
            Signup
          </a>
        </div>
      </div>
    )
  }
}
