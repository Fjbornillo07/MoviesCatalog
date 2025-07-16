import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../UserContext";

export default function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="bg-light py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="mb-4">
            <h1 className="display-4">🎬 Welcome to Movie Tracker</h1>
            <p className="lead">
              Discover, track, and manage your favorite movies all in one place.
              Whether you're a casual viewer or an admin adding content — we've got you covered!
            </p>
            <div className="d-flex gap-3">
              <Button as={Link} to="/movies" variant="primary">
                Browse Movies
              </Button>
              {!user.token && (
                <Button as={Link} to="/register" variant="outline-primary">
                  Get Started
                </Button>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
