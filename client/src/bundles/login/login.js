import React from 'react'
import ReactDOM from 'react-dom'

import { LoginForm } from 'components'

import './login.scss'

const container = document.getElementById('login_container')

ReactDOM.render(<LoginForm />, container)
