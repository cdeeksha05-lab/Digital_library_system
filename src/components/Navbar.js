import "../styles/Navbar.css";

import logo from "../assets/logo.png";

function Navbar(){

    return(

        <nav className="navbar">

            <div className="left">

                <img src={logo} alt="logo"/>

                <h2>Digital Library</h2>

            </div>

            <div className="right">

                🔔

                <span>Admin</span>

                👤

            </div>

        </nav>

    )

}

export default Navbar;