import React from 'react'
import { block as BEM } from 'bem-class'

import './style.scss'

const LogoutButton = (props) => {
  // Redirect if the session was deleted
  if(props.didDelete) window.location.href = '/login'

  // Determine classes based on props
  const classes = BEM('logout-button').modifier({
    'disabled': props.isFetching || props.caughtError
  })

  // Return component
  return (
    <div
      className={ classes }
      onClick={ !props.isFetching && props.deleteSession }>Logout</div>
  )
}

LogoutButton.propTypes = {
  deleteSession: React.PropTypes.func.isRequired,
  didDelete: React.PropTypes.bool,
  isFetching: React.PropTypes.bool,
  caughtError: React.PropTypes.bool,
  error: React.PropTypes.object
}

export default LogoutButton
