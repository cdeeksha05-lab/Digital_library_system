import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import DataTable from "../components/DataTable";
import API from "../services/api";
import "../styles/Form.css";
import "../styles/Table.css";
import "../styles/Buttons.css";

function Authors() {

    const [authorId, setAuthorId] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [country, setCountry] = useState("");
    const [birthYear, setBirthYear] = useState("");

    const [authors, setAuthors] = useState([]);

    useEffect(() => {

        loadAuthors();

    }, []);

    // ===============================
    // Load All Authors
    // ===============================

    const loadAuthors = async () => {

        try {

            const response = await API.get("/authors");

            setAuthors(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Authors");

        }

    };

    // ===============================
    // Add Author
    // ===============================

    const addAuthor = async () => {

        try {

            const response = await API.get("/authors_add", {

                params: {

                    author_id: Number(authorId),
                    author_name: authorName,
                    country: country,
                    birth_year: Number(birthYear)

                }

            });
            console.log("Add Success:", response.data)

            alert(response.data.message);

        }

        catch (error) {

            console.log(error);

             console.log("Response:", error.response);

        console.log("Data:", error.response?.data);

        console.log("Status:", error.response?.status);

        alert(error.response?.data?.message || error.message);

        }

    };

    // ===============================
    // Update Author
    // ===============================

    const updateAuthor = async () => {

        try {

            const response = await API.get("/authors_update", {

                params: {

                    author_id: Number(authorId),
                    author_name: authorName,
                    country: country,
                    birth_year: Number(birthYear)

                }

            });

            alert(response.data.message);

            clearForm();

            loadAuthors();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Update Author");

        }

    };

    // ===============================
    // Delete Author
    // ===============================

    const deleteAuthor = async () => {

        try {

            const response = await API.get("/authors_delete", {

                params: {

                    author_id: Number(authorId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadAuthors();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Delete Author");

        }

    };

    // ===============================
    // Search Author
    // ===============================

    const searchAuthor = async () => {

        try {

            const response = await API.get("/authors_search", {

                params: {

                    author_id: Number(authorId)

                }

            });

            setAuthorName(response.data.author_name);

            setCountry(response.data.country);

            setBirthYear(response.data.birth_year);

        }

        catch (error) {

            console.log(error);

            alert("Author Not Found");

        }

    };

    // ===============================
    // Clear Form
    // ===============================

    const clearForm = () => {

        setAuthorId("");

        setAuthorName("");

        setCountry("");

        setBirthYear("");

    };
        return (

        <Layout>

            <div className="form-container">

                <h2 className="form-title">
                    Authors Management
                </h2>

                <div className="form-row">

                    <FormInput
                        type="number"
                        placeholder="Author ID"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Author Name"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Birth Year"
                        value={birthYear}
                        onChange={(e) => setBirthYear(e.target.value)}
                    />

                </div>

                <div className="action-buttons">

                    <PrimaryButton
                        text="Add"
                        color="success"
                        onClick={addAuthor}
                    />

                    <PrimaryButton
                        text="Update"
                        color="primary"
                        onClick={updateAuthor}
                    />

                    <PrimaryButton
                        text="Delete"
                        color="danger"
                        onClick={deleteAuthor}
                    />

                    <PrimaryButton
                        text="Search"
                        color="warning"
                        onClick={searchAuthor}
                    />

                    <PrimaryButton
                        text="Clear"
                        color="secondary"
                        onClick={clearForm}
                    />

                    <PrimaryButton
                        text="Refresh"
                        color="info"
                        onClick={loadAuthors}
                    />

                </div>

            </div>

            <div className="table-responsive">

                <DataTable

                    columns={[

                        "Author ID",
                        "Author Name",
                        "Country",
                        "Birth Year"

                    ]}

                    data={authors}

                />

            </div>

        </Layout>

    );

}

export default Authors;
