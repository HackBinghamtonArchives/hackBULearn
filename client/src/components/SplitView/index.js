import React from 'react'
import { block as BEM } from 'bem-class'

import TableView from 'components/TableView'
import './style.scss'

export default class SplitView extends React.Component {
  static propTypes = {
    subviews: React.PropTypes.array.isRequired,
    onChange: React.PropTypes.func,
    activeView: React.PropTypes.number.isRequired
  }

  constructor(props) {
    super(props)
  }

  renderTableView(className) {
    const items = this.props.subviews.map((subview, index) => {
      return (
        <TableView.Item
          title={ subview.title }
          key={ index }
          onClick={ () => this.props.onChange(index) }
          icon={ subview.icon }
          itemId={ index } />
      )
    })

    return (
      <div className={ className.element('table_view') }>
        <TableView activeItem={ this.props.activeView }>
          { items }
        </TableView>
      </div>
    )
  }

  renderContentView(className) {
    if(this.props.activeView > -1) {
      return (
        <div className={ className.element('content_view') }>
          { this.props.children[this.props.activeView] }
        </div>
      )
    }
  }

  render() {
    const split_view = BEM('split_view')

    return (
      <div className={split_view}>
        { this.renderTableView(split_view) }
        { this.renderContentView(split_view) }
      </div>
    )
  }
}
