import _ from 'lodash'
import React from 'react'
import { block as BEM } from 'bem-class'
import { Badge } from 'components'

import './AchievementLayout.scss'

export default class AchievementLayout extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render() {
    const achievement_layout = BEM('achievement_layout')

    return (
      <div className={achievement_layout}>
        <div className={achievement_layout.element('heading')}>
          Hacking Achievements
        </div>
        {
          _.times(18, (i) => {
            return (
              <div className={achievement_layout.element('badge')}>
                <Badge locked={i % 5 == 0} title={'Badge ' + (i + 1)} />
              </div>
            )
          })
        }
      </div>
    )
  }
}
