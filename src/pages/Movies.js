import { useEffect, useState, useContext } from "react";
import { Card, Button, Row, Col, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://movieapp-api-lms1.onrender.com/movies/getMovies")
      .then((res) => res.json())
      .then((data) => {
        // Ensure it's an array
        setMovies(Array.isArray(data) ? data : data.movies || []);
      });
  }, []);

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Movie Catalog</h2>
        {user.isAdmin && (
          <Button
            id="addMovie"
            variant="success"
            onClick={() => navigate("/movies")} // if this triggers admin dashboard
          >
            ➕ Add Movie
          </Button>
        )}
      </div>

      <Row>
        {movies.map((movie) => (
          <Col key={movie._id} md={4} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Subtitle className="text-muted mb-2">
                  {movie.genre} • {movie.year}
                </Card.Subtitle>
                <Card.Text>{movie.description?.slice(0, 80)}...</Card.Text>
                <Button as={Link} to={`/movie/${movie._id}`} variant="primary">
                  View Movie
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
