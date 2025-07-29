// questo componente renderizzerà l'elemento centrale dell'interfaccia
// una Card di react-bootstrap che conterrà la locandina, il titolo e qualche
// altra informazione accessoria del film selezionato

import { Component } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'

// questi dettagli verranno recuperati da una chiamata API verso le OmdbAPI
// poiché questi dati recuperati verso le API devono finire nell'interfaccia
// abbiamo già capito che dovranno passare per uno STATE -> componente a Classe

class MovieCard extends Component {
  // la fetch per il recupero dati per la Card la farò in questo componente MovieCard
  // perchè non ho necessità di condividerli altrove

  state = {
    movieDetails: {}, // inizialmente è VUOTO
  }

  getMovieDetails = () => {
    // faccio una fetch a OmdbAPI
    // this.props.movieTitle inizialmente è "Superman"
    fetch('http://www.omdbapi.com/?apikey=24ad60e9&s=' + this.props.movieTitle)
      .then((response) => {
        if (response.ok) {
          return response.json()
        } else {
          throw new Error('errore nella chiamata omdb')
        }
      })
      .then((data) => {
        console.log('DATI RICEVUTI DA OMDB', data.Search[0])
        this.setState({
          movieDetails: data.Search[0],
        }) // provoca un aggiornamento!
      })
      .catch((err) => {
        console.log('err', err)
      })
  }

  componentDidMount() {
    console.log('COMPONENTDIDMOUNT')
    this.getMovieDetails() // all'avvio lancio la chiamata API
    // se componentDidMount viene eseguito UNA VOLTA SOLA, a seguito della
    // prima invocazione di render...
  }

  componentDidUpdate(
    prevProps // il precedente oggetto delle props
    // prevState // il precedente oggetto dellos state
  ) {
    // ...componentDidUpdate invece viene eseguito OGNI VOLTA che il componente
    // attraversa un "UPDATE" (ovvero un cambio di stato o un cambio di props)
    // (che sono le stesse identiche condizioni per cui RENDER viene ri-eseguito)
    console.log('SONO COMPONENTDIDUPDATE')
    // però componentDidUpdate non risolve AUTOMATICAMENTE il problema, perchè
    // se non posso inserire la chiamata a this.getMovieDetails() in render
    // non posso inserirla neanche in componentDidUpdate, perchè sono due metodi
    // molto simili e che si "risvegliano" secondo le stesse logiche!
    // this.getMovieDetails()
    // ne veniamo fuori grazie all'UNICA differenza tra render() e componentDidUpdate():
    // componentDidUpdate, a differenza di render, ACCETTA FINO A 2 PARAMETRI
    // cosa sono questi due parametri: sono sostanzialmente un metodo per CAPIRE
    // COSA ha causato l'update.

    // il mio risultato ottimale sarebbe: azionare una nuova volta la fetch
    // quando CAMBIANO LE PROPS (cioè il titolo del film, il valore della tendina!)
    // e cosa invece NON voglio: ri-azionare la fetch quando cambia LO STATO

    // il problema è che un "update" in REACT può essere SIA un cambio di props
    // SIA un cambio di state: componentDidUpdate, grazie ai suoi due parametri,
    // ci permette di DIFFERENZIARE le cose e capire se l'update è avvenuto
    // a causa di un cambio di PROPS o se invece è avvenuto a causa di un cambio di STATE
    if (prevProps.movieTitle !== this.props.movieTitle) {
      // io voglio eseguire la fetch solo quando cambia il valore della tendina
      // --> quando CAMBIANO LE PROPS, NON quando cambia lo state!

      // quando entro qui? quando da superman -> cyborg, iron man -> hulk etc.
      this.getMovieDetails()
    }

    // un componentDidUpdate senza un if -> CICLO INFINITO
  }

  // componentDidUpdate (a differenza di render) ci permette di capire IL MOTIVO
  // per cui è avvenuto un aggiornamento, e ci consente di imporre delle condizioni
  // in modo da DISCRIMINARE le due situazioni

  render() {
    console.log('SONO RENDER')
    // this.getMovieDetails()
    // SBAGLIATO! non possiamo dentro render invocare un metodo
    // in cui si setta lo stato del componente! perchè un setState causa un
    // aggiornamento del componente, per cui render() verrebbe nuovamente
    // re-invocato -> CICLO INFINITO
    return (
      <Container>
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={4}>
            <Card>
              <Card.Img variant="top" src={this.state.movieDetails.Poster} />
              <Card.Body>
                <Card.Title>{this.state.movieDetails.Title}</Card.Title>
                <Card.Text>{this.state.movieDetails.Year}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default MovieCard
