import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Form, Button, Container, Card, Spinner, ListGroup } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");

  const { user } = useContext(UserContext);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`https://movieapp-api-lms1.onrender.com/movies/addComment/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ comment: newComment }),
    });

    if (res.ok) {
      setNewComment("");
      Swal.fire("Posted!", "Comment added", "success");

      const updatedComments = await fetch(`https://movieapp-api-lms1.onrender.com/movies/getComments/${id}`);
      setComments(await updatedComments.json());
    } else {
      Swal.fire("Error", "Failed to post comment", "error");
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://movieapp-api-lms1.onrender.com/movies/getMovie/${id}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error("Failed to fetch movie:", err);
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`https://movieapp-api-lms1.onrender.com/movies/getComments/${id}`);
        const data = await res.json();
        if (Array.isArray(data)) {
          setComments(data);
        }
      } catch (err) {
        console.error("Failed to fetch comments:", err);
      }
    };

    Promise.all([fetchMovie(), fetchComments()]).then(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (!movie) {
    return (
      <Container className="mt-5 text-center">
        <p>Movie not found.</p>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <Card>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            Directed by {movie.director} ({movie.year})
          </Card.Subtitle>
          <Card.Text>
            <strong>Genre:</strong> {movie.genre}<br />
            <strong>Description:</strong> {movie.description}
          </Card.Text>
        </Card.Body>
      </Card>

      {user.token && (
        <Form onSubmit={handleCommentSubmit} className="mt-4">
          <Form.Group>
            <Form.Label>Add a Comment</Form.Label>
            <Form.Control
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              required
            />
          </Form.Group>
          <Button className="mt-2" type="submit">Submit</Button>
        </Form>
      )}

      <h4 className="mt-4">Comments</h4>
      {comments.length > 0 ? (
        <ListGroup>
          {comments.map((comment, idx) => (
            <ListGroup.Item key={idx}>{comment.comment}</ListGroup.Item>
          ))}
        </ListGroup>
      ) : (
        <p className="text-muted">No comments yet.</p>
      )}
    </Container>
  );
}
