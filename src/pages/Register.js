import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/Login.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const register = async () => {

        if (
            name === "" ||
            email === "" ||
            phone === "" ||
            username === "" ||
            password === "" ||
            confirmPassword === ""
        ) {
            alert("Please fill all fields.");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        try {

            const response = await API.get("/register", {

                params: {

                    name: name,
                    email: email,
                    phone: phone,
                    username: username,
                    password: password

                }

            });

            alert(response.data.message);

            navigate("/login");

        }

        catch (error) {

            console.log(error);

            alert("Registration Failed");

        }

    };

    return (

        <div className="login-page">

            <div className="login-box">

                <h2>Digital Library</h2>

                <h4>Create Account</h4>

                <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <br />

                <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <br />

                <input
                    type="text"
                    className="form-control"
                    placeholder="Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <br />

                <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />

                <br />

                <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <br />

                <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <br />

                <button
                    className="btn btn-success w-100"
                    onClick={register}
                >
                    Register
                </button>

                <br />
                <br />

                <button
                    className="btn btn-primary w-100"
                    onClick={() => navigate("/login")}
                >
                    Already have an account? Login
                </button>

            </div>

        </div>

    );

}

export default Register;