import React from 'react';
import ReactDOM from 'react-dom';

import LoginForm from 'components/LoginForm';

import './login.scss';

const container = document.getElementById('login-container');

ReactDOM.render(<LoginForm />, container);
