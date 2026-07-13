import { useState } from "react";
import Login from "../pages/Login";
import Register from "../pages/Register";

function AuthPage() {

    const [tab, setTab] = useState("login");

    return (

        <div className="auth-container">

            <div className="tabs">

                <button onClick={() => setTab("login")}>
                    Login
                </button>

                <button onClick={() => setTab("register")}>
                    Register
                </button>

            </div>

            {tab === "login" ? <Login /> : <Register />}

        </div>

    );

}

export default AuthPage;