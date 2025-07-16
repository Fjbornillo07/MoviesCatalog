import { Table, Button } from "react-bootstrap";

export default function MovieTable({ movies, onDelete, onEdit }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Director</th>
          <th>Year</th>
          <th>Genre</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {movies.map((movie) => (
          <tr key={movie._id}>
            <td>{movie.title}</td>
            <td>{movie.director}</td>
            <td>{movie.year}</td>
            <td>{movie.genre}</td>
            <td>{movie.description}</td>
            <td>
              <Button variant="warning" size="sm" onClick={() => onEdit(movie)}>
                Edit
              </Button>{" "}
              <Button variant="danger" size="sm" onClick={() => onDelete(movie._id)}>
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
