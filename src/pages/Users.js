import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import DataTable from "../components/DataTable";
import API from "../services/api";
import "../styles/Form.css";
import "../styles/Table.css";
import "../styles/Buttons.css";

function Users() {

    const [userId, setUserId] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const [users, setUsers] = useState([]);

    useEffect(() => {

        loadUsers();

    }, []);

    // ===============================
    // Load Users
    // ===============================

    const loadUsers = async () => {

        try {

            const response = await API.get("/users");

            setUsers(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Users");

        }

    };

    // ===============================
    // Add User
    // ===============================

    const addUser = async () => {

        try {

            const response = await API.get("/users_add", {

                params: {

                    user_id: Number(userId),
                    name: name,
                    email: email,
                    phone: phone,
                    address: address

                }

            });

            alert(response.data.message);

            clearForm();

            loadUsers();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Add User");

        }

    };

    // ===============================
    // Update User
    // ===============================

    const updateUser = async () => {

        try {

            const response = await API.get("/users_update", {

                params: {

                    user_id: Number(userId),
                    name: name,
                    email: email,
                    phone: phone,
                    address: address

                }

            });

            alert(response.data.message);

            clearForm();

            loadUsers();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Update User");

        }

    };

    // ===============================
    // Delete User
    // ===============================

    const deleteUser = async () => {

        try {

            const response = await API.get("/users_delete", {

                params: {

                    user_id: Number(userId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadUsers();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Delete User");

        }

    };

    // ===============================
    // Search User
    // ===============================

    const searchUser = async () => {

        try {

            const response = await API.get("/users_search", {

                params: {

                    user_id: Number(userId)

                }

            });

            setName(response.data.name);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setAddress(response.data.address);

        }

        catch (error) {

            console.log(error);

            alert("User Not Found");

        }

    };

    // ===============================
    // Clear Form
    // ===============================

    const clearForm = () => {

        setUserId("");
        setName("");
        setEmail("");
        setPhone("");
        setAddress("");

    };
        return (

        <Layout>

            <div className="form-container">

                <h2 className="form-title">

                    Users Management

                </h2>

                <div className="form-row">

                    <FormInput
                        type="number"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <FormInput
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                </div>

                <div className="action-buttons">

                    <PrimaryButton
                        text="Add"
                        color="success"
                        onClick={addUser}
                    />

                    <PrimaryButton
                        text="Update"
                        color="primary"
                        onClick={updateUser}
                    />

                    <PrimaryButton
                        text="Delete"
                        color="danger"
                        onClick={deleteUser}
                    />

                    <PrimaryButton
                        text="Search"
                        color="warning"
                        onClick={searchUser}
                    />

                    <PrimaryButton
                        text="Clear"
                        color="secondary"
                        onClick={clearForm}
                    />

                    <PrimaryButton
                        text="Refresh"
                        color="info"
                        onClick={loadUsers}
                    />

                </div>

            </div>

            <div className="table-responsive">

                <DataTable

                    columns={[

                        "User ID",
                        "Name",
                        "Email",
                        "Phone",
                        "Address"

                    ]}

                    data={users}

                />

            </div>

        </Layout>

    );

}

export default Users;
