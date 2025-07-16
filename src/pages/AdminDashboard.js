import { useEffect, useState, useContext } from "react";
import { Button, Modal, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import UserContext from "../UserContext";
import MovieForm from "../components/MovieForm";
import MovieTable from "../components/MovieTable";

export default function AdminDashboard() {
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const [movieData, setMovieData] = useState({
    title: "",
    director: "",
    year: "",
    genre: "",
    description: "",
  });

  const [editMovieId, setEditMovieId] = useState(null);

  const fetchMovies = async () => {
    const res = await fetch("https://movieapp-api-lms1.onrender.com/movies/getMovies");
    const data = await res.json();
    setMovies(Array.isArray(data) ? data : data.movies || []);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleAddMovie = async () => {
    const res = await fetch("https://movieapp-api-lms1.onrender.com/movies/addMovie", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(movieData),
    });

    if (res.ok) {
      Swal.fire("Success", "Movie added", "success");
      setShowAddModal(false);
      setMovieData({ title: "", director: "", year: "", genre: "", description: "" });
      fetchMovies();
    } else {
      Swal.fire("Error", "Failed to add movie", "error");
    }
  };

  const handleEditMovie = async () => {
    const res = await fetch(
      `https://movieapp-api-lms1.onrender.com/movies/updateMovie/${editMovieId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(movieData),
      }
    );

    if (res.ok) {
      Swal.fire("Success", "Movie updated", "success");
      setShowEditModal(false);
      setMovieData({ title: "", director: "", year: "", genre: "", description: "" });
      fetchMovies();
    } else {
      Swal.fire("Error", "Failed to update movie", "error");
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the movie.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await fetch(
        `https://movieapp-api-lms1.onrender.com/movies/deleteMovie/${id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );

      if (res.ok) {
        Swal.fire("Deleted", "Movie removed", "success");
        fetchMovies();
      } else {
        Swal.fire("Error", "Failed to delete movie", "error");
      }
    }
  };

  const openEditModal = (movie) => {
    setEditMovieId(movie._id);
    setMovieData({
      title: movie.title,
      director: movie.director,
      year: movie.year,
      genre: movie.genre,
      description: movie.description,
    });
    setShowEditModal(true);
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">🎬 Admin Movie Dashboard</h2>
        <Button id="addMovie" variant="primary" onClick={() => setShowAddModal(true)}>
          + Add Movie
        </Button>
      </div>

      <MovieTable movies={movies} onDelete={handleDelete} onEdit={openEditModal} />

      {/* Add Movie Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MovieForm movieData={movieData} setMovieData={setMovieData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
          <Button variant="success" onClick={handleAddMovie}>Add Movie</Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Movie Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <MovieForm movieData={movieData} setMovieData={setMovieData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleEditMovie}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
