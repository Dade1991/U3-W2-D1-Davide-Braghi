import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Col, Container, Row } from 'react-bootstrap'
import Table from './components/Table'
import Detail from './components/Detail'
import { Component } from 'react'

class App extends Component {
  // poichè Table e Detail vorrebbero accedere allo stesso stato, questo stato
  // non può più vivere né in uno né nell'altro componente, perchè non essendo in
  // relazione padre-figlio tra di loro non sono neanche consapevoli della
  // reciproca esistenza.
  // Abbiamo bisogno di trovare il PADRE comune tra Table e Detail (in questo
  // caso è App) e SPOSTARE lo stato lì! In questo modo App potrebbe poi
  // ri-fornire lo stato di selected a entrambi Table e Detail tramite props.

  // qui ci sposto lo stato che originariamente era in Table
  state = {
    selected: undefined,
  }

  // ora Table avrebbe bisogno al click dei suoi elementi di cambiare lo stato
  // in App... ma non può farlo normalmente! L'unico modo per cambiare uno stato
  // è utilizzare il metodo setState() che vive su this. E quindi l'unico componente
  // in grado di eseguire il giusto this.setState() è proprio App.

  changeAppState = (newState) => {
    this.setState(newState)
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Container>
            <Row>
              <Col>
                <Table
                  selectedFromApp={this.state.selected} // questo è il DATO che forniamo a Table
                  setStateFromApp={this.changeAppState} // questo è il modo di CAMBIARE lo stato di App
                />
              </Col>
              <Col className="my-auto">
                <Detail
                  selectedFromApp={this.state.selected} // questo è il DATO che forniamo a Detail
                />
              </Col>
            </Row>
          </Container>
        </header>
      </div>
    )
  }
}

export default App
