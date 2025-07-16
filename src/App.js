import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import UserContext from "./UserContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Movies from "./pages/Movies";
import AdminDashboard from "./pages/AdminDashboard";
import MovieDetails from "./pages/MovieDetails";
import NavigationBar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState({ token: null, isAdmin: false, email: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <NavigationBar />

        <Routes>
          {/* Only show Home route if NOT admin */}
          {!user.isAdmin && <Route path="/home" element={<Home />} />}

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/movies"
            element={user.isAdmin ? <AdminDashboard /> : <Movies />}
          />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
