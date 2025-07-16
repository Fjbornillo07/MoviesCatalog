import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function MovieCard({ movie }) {
  return (
    <Card className="mb-4 h-100 shadow-sm">
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {movie.director} • {movie.year}
        </Card.Subtitle>
        <Card.Text>
          <strong>Genre:</strong> {movie.genre}
        </Card.Text>
        <Link to={`/movie/${movie._id}`}>
          <Button variant="primary">View Movie</Button>
        </Link>
      </Card.Body>
    </Card>
  );
}
