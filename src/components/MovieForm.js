import { Form } from "react-bootstrap";

export default function MovieForm({ movieData, setMovieData }) {
  return (
    <Form>
      {["title", "director", "year", "genre", "description"].map((field) => (
        <Form.Group key={field} className="mb-3">
          <Form.Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Form.Label>
          <Form.Control
            type={field === "year" ? "number" : "text"}
            value={movieData[field]}
            onChange={(e) =>
              setMovieData({ ...movieData, [field]: e.target.value })
            }
            required
          />
        </Form.Group>
      ))}
    </Form>
  );
}
