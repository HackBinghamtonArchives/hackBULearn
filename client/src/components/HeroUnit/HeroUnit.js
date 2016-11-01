import React from 'react'
import { block as BEM } from 'bem-class'

import './HeroUnit.scss'

import iphoneImage from './iphone.png'
import heroText from './hero-text.png'

export default class HeroUnit extends React.Component {
  static propTypes = {}

  state = {}

  constructor(props) {
    super(props)
  }

  render() {
    const hero_unit = BEM('hero_unit')

    return (
      <div className={hero_unit}>
        <div className={hero_unit.element('content')}>
          <img className={hero_unit.element('logo')}
               src={'/bundles/' + heroText} />
          <div className={hero_unit.element('text')}>
            Create something new.
          </div>
          <a href='#' className={hero_unit.element('button')}>
            View our courses
          </a>
        </div>
        <div className={hero_unit.element('iphone_image')}>
          <img src={'/bundles/' + iphoneImage} />
        </div>
      </div>
    )
  }
}
