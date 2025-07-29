import { Component } from 'react'
import { ListGroup } from 'react-bootstrap'

class Table extends Component {
  // state = {
  //   selected: undefined,
  // }

  checkSelected = (value) =>
    value === this.props.selectedFromApp ? 'selezionato' : ''

  render() {
    return (
      <>
        <ListGroup className="text-dark">
          <ListGroup.Item
            onClick={() => this.props.setStateFromApp({ selected: 'Uno' })}
            className={this.checkSelected('Uno')}
          >
            Uno
          </ListGroup.Item>
          <ListGroup.Item
            onClick={() => this.props.setStateFromApp({ selected: 'Due' })}
            className={this.checkSelected('Due')}
          >
            Due
          </ListGroup.Item>
          <ListGroup.Item
            onClick={() => this.props.setStateFromApp({ selected: 'Tre' })}
            className={this.checkSelected('Tre')}
          >
            Tre
          </ListGroup.Item>
        </ListGroup>
        <p className="mt-3">
          Stato del componente: {this.props.selectedFromApp || 'undefined'}
        </p>
      </>
    )
  }
}

export default Table
