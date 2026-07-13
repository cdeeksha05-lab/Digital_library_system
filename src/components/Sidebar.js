import {Link} from "react-router-dom";

import "../styles/Sidebar.css";

function Sidebar(){

    return(

        <div className="sidebar">

            <Link to="/dashboard">🏠 Dashboard</Link>

            <Link to="/authors">✍ Authors</Link>

            <Link to="/books">📚 Books</Link>

            <Link to="/users">👨 Users</Link>

            <Link to="/publishers">🏢 Publishers</Link>

            <Link to="/genres">🏷 Genres</Link>

            <Link to="/bookgenres">📖 Book Genres</Link>

            <Link to="/loans">📅 Loans</Link>

            <Link to="/reservations">📌 Reservations</Link>

            <Link to="/reviews">⭐ Reviews</Link>

            <Link to="/fines">💰 Fines</Link>

            <Link to="/">Logout</Link>

        </div>

    )

}

export default Sidebar;