import "./../styles/Login.css";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const login = async () => {

        if (username === "" || password === "") {

            alert("Please enter Username and Password");

            return;

        }

        try {

            const response = await API.get("/login", {

                params: {

                    username: username,
                    password: password

                }

            });

            if (response.data.status === "success") {

                alert(response.data.message);

                navigate("/dashboard");

            }

            else {

                alert(response.data.message);

            }

        }

        catch (error) {

            console.log(error);

            alert("Login Failed");

        }

    };

    return (

        <div className="login-page">

            <div className="login-card">

                <img src={logo} alt="logo" />

                <h2>Digital Library Management</h2>

                <input

                    type="text"

                    className="form-control"

                    placeholder="Username"

                    value={username}

                    onChange={(e) => setUsername(e.target.value)}

                />

                <input

                    type="password"

                    className="form-control"

                    placeholder="Password"

                    value={password}

                    onChange={(e) => setPassword(e.target.value)}

                />

                <button

                    className="btn-login"

                    onClick={login}

                >

                    Login

                </button>

                <br />
                <br />

                <button

                    className="btn btn-success"

                    onClick={() => navigate("/register")}

                >

                    New User? Register

                </button>

            </div>

        </div>

    );

}

export default Login;