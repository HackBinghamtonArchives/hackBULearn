import React from 'react'
import { HeroUnit } from 'components'

export default class OverviewLayout extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className='overview_layout'>
        <HeroUnit />
      </div>
    )
  }
}
