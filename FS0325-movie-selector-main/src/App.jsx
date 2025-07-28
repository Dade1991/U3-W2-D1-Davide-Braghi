import 'bootstrap/dist/css/bootstrap.min.css'
import { Component } from 'react'
import { Col, Container, Row, Form } from 'react-bootstrap'
import MovieCard from './components/MovieCard'

class App extends Component {
  state = {
    movieTitle: 'Superman', // valore iniziale della tendina
  }

  render() {
    return (
      <>
        <header>
          <Container>
            <Row className="justify-content-center mt-5">
              <Col xs={12} md={6} lg={4}>
                <h2 className="text-center mb-3">EPICODE MOVIE SELECTOR</h2>
                <Form.Select
                  aria-label="Select for movie title"
                  value={this.state.movieTitle}
                  onChange={(e) => {
                    this.setState({
                      movieTitle: e.target.value,
                    })
                  }}
                >
                  <option>Superman</option>
                  <option>Iron Man</option>
                  <option>Batman</option>
                  <option>Hulk</option>
                  <option>Dr. Strange</option>
                  <option>Cyborg</option>
                  <option>Spider Man</option>
                  <option>Green Lantern</option>
                </Form.Select>
              </Col>
            </Row>
          </Container>
        </header>
        <main className="mt-3">
          <MovieCard movieTitle={this.state.movieTitle} />
          {/* MovieCard ora riceve una prop chiamata "movieTitle" che
          sarà sempre collegata al valore selezionato nella tendina dei film */}
        </main>
      </>
    )
  }
}

export default App
