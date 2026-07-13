import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Authors from "./pages/Authors";
import Books from "./pages/Books";
import Users from "./pages/Users";
import Publishers from "./pages/Publishers";
import Genres from "./pages/Genres";
import BookGenres from "./pages/BookGenres";
import Loans from "./pages/Loans";
import Reservations from "./pages/Reservations";
import Reviews from "./pages/Reviews";
import Fines from "./pages/Fines";
import Register from "./pages/Register";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route path="/" element={<Login />} />
                  <Route path="/login" element={<Login />} />

    <Route path="/register" element={<Register />} />


                <Route path="/dashboard" element={<Dashboard />} />

                <Route path="/authors" element={<Authors />} />

                <Route path="/books" element={<Books />} />

                <Route path="/users" element={<Users />} />

                <Route path="/publishers" element={<Publishers />} />

                <Route path="/genres" element={<Genres />} />

                <Route path="/bookgenres" element={<BookGenres />} />

                <Route path="/loans" element={<Loans />} />

                <Route path="/reservations" element={<Reservations />} />

                <Route path="/reviews" element={<Reviews />} />

                <Route path="/fines" element={<Fines />} />

            </Routes>

        </BrowserRouter>

    );
}

export default App;