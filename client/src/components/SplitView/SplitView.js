import React from 'react'
import { block as BEM } from 'bem-class'

import './SplitView.scss'

export default class SplitView extends React.Component {
  static propTypes = {
    subviews: React.PropTypes.array.isRequired
  }

  state = {
    selection: -1
  }

  constructor(props) {
    super(props)

    this.changeSelection = this.changeSelection.bind(this)
  }

  changeSelection(index) {
    this.setState({ selection: index })
  }

  renderTableCell(text, index, className) {
    return (
      <div className={className.element('table_cell').modifier({
          'active': this.state.selection == index
        })} onClick={() => this.changeSelection(index)} key={index}>
        {text}
      </div>
    )
  }

  renderTableView(className) {
    const table_cells = this.props.subviews.map((subview, index) => {
      return this.renderTableCell(subview, index, className)
    })

    return (
      <div className={className.element('table_view')}>
        {table_cells}
      </div>
    )
  }

  renderContentView(className) {
    if(this.state.selection > -1) {
      return (
        <div className={className.element('content_view')}>
          {this.props.children[this.state.selection]}
        </div>
      )
    }
  }

  render() {
    const split_view = BEM('split_view')

    return (
      <div className={split_view}>
        {this.renderTableView(split_view)}
        {this.renderContentView(split_view)}
      </div>
    )
  }
}
