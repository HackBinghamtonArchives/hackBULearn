import React from 'react'

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
    return (
      <div className='hero_unit'>
        <div className='hero_unit__content'>
          <img className='hero_unit__content__logo' src={'/bundles/' + heroText} />
          <div className='hero_unit__content__text'>
            Create something new.
          </div>
          <a href='#' className='hero_unit__content__text__button'>
            View our courses
          </a>
        </div>
        <div className='hero_unit__iphone_image'>
          <img src={'/bundles/' + iphoneImage} />
        </div>
      </div>
    )
  }
}
