import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import DataTable from "../components/DataTable";
import API from "../services/api";
import "../styles/Form.css";
import "../styles/Table.css";
import "../styles/Buttons.css";

function Genres() {

    const [genreId, setGenreId] = useState("");
    const [genreName, setGenreName] = useState("");

    const [genres, setGenres] = useState([]);

    useEffect(() => {

        loadGenres();

    }, []);

    // ===============================
    // Load Genres
    // ===============================

    const loadGenres = async () => {

        try {

            const response = await API.get("/genres");

            setGenres(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Genres");

        }

    };

    // ===============================
    // Add Genre
    // ===============================

    const addGenre = async () => {

        try {

            const response = await API.get("/genres_add", {

                params: {

                    genre_id: Number(genreId),
                    genre_name: genreName

                }

            });

            alert(response.data.message);

            clearForm();

            loadGenres();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Add Genre");

        }

    };

    // ===============================
    // Update Genre
    // ===============================

    const updateGenre = async () => {

        try {

            const response = await API.get("/genres_update", {

                params: {

                    genre_id: Number(genreId),
                    genre_name: genreName

                }

            });

            alert(response.data.message);

            clearForm();

            loadGenres();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Update Genre");

        }

    };

    // ===============================
    // Delete Genre
    // ===============================

    const deleteGenre = async () => {

        try {

            const response = await API.get("/genres_delete", {

                params: {

                    genre_id: Number(genreId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadGenres();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Delete Genre");

        }

    };

    // ===============================
    // Search Genre
    // ===============================

    const searchGenre = async () => {

        try {

            const response = await API.get("/genres_search", {

                params: {

                    genre_id: Number(genreId)

                }

            });

            setGenreName(response.data.genre_name);

        }

        catch (error) {

            console.log(error);

            alert("Genre Not Found");

        }

    };

    // ===============================
    // Clear Form
    // ===============================

    const clearForm = () => {

        setGenreId("");
        setGenreName("");

    };
        return (

        <Layout>

            <div className="form-container">

                <h2 className="form-title">

                    Genres Management

                </h2>

                <div className="form-row">

                    <FormInput
                        type="number"
                        placeholder="Genre ID"
                        value={genreId}
                        onChange={(e) => setGenreId(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Genre Name"
                        value={genreName}
                        onChange={(e) => setGenreName(e.target.value)}
                    />

                </div>

                <div className="action-buttons">

                    <PrimaryButton
                        text="Add"
                        color="success"
                        onClick={addGenre}
                    />

                    <PrimaryButton
                        text="Update"
                        color="primary"
                        onClick={updateGenre}
                    />

                    <PrimaryButton
                        text="Delete"
                        color="danger"
                        onClick={deleteGenre}
                    />

                    <PrimaryButton
                        text="Search"
                        color="warning"
                        onClick={searchGenre}
                    />

                    <PrimaryButton
                        text="Clear"
                        color="secondary"
                        onClick={clearForm}
                    />

                    <PrimaryButton
                        text="Refresh"
                        color="info"
                        onClick={loadGenres}
                    />

                </div>

            </div>

            <div className="table-responsive">

                <DataTable

                    columns={[

                        "Genre ID",
                        "Genre Name"

                    ]}

                    data={genres}

                />

            </div>

        </Layout>

    );

}

export default Genres;
