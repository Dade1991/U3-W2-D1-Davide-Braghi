import { Component } from "react"
import SingleBook from "./SingleBook"
import { Col, Form, Row } from "react-bootstrap"
import CommentArea from "./CommentArea"

class BookList extends Component {
  state = {
    searchQuery: "",
    asin: "",
  }

  setAsin = (asin) => {
    this.setState({ asin: asin })
  }

  render() {
    return (
      <>
        <Row>
          <Col>
            <Row className="justify-content-center mt-5">
              <Col xs={12} md={4} className="text-center">
                <Form.Group>
                  <Form.Control
                    type="search"
                    placeholder="Cerca un libro"
                    value={this.state.searchQuery}
                    onChange={(e) =>
                      this.setState({ searchQuery: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="g-2 mt-3">
              {this.props.books
                .filter((b) =>
                  b.title.toLowerCase().includes(this.state.searchQuery)
                )
                .map((b) => (
                  <Col xs={12} md={4} key={b.asin}>
                    <SingleBook setAsin={this.setAsin} book={b} />
                  </Col>
                ))}
            </Row>
          </Col>
          <Col>
            <CommentArea asin={this.state.asin} />
          </Col>
        </Row>
      </>
    )
  }
}

export default BookList
