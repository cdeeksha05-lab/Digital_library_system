import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import DataTable from "../components/DataTable";
import API from "../services/api";
import "../styles/Form.css";
import "../styles/Table.css";
import "../styles/Buttons.css";

function BookGenres() {

    const [bookGenreId, setBookGenreId] = useState("");
    const [bookId, setBookId] = useState("");
    const [genreId, setGenreId] = useState("");

    const [bookGenres, setBookGenres] = useState([]);

    useEffect(() => {

        loadBookGenres();

    }, []);

    // ===========================
    // Load BookGenres
    // ===========================

    const loadBookGenres = async () => {

        try {

            const response = await API.get("/bookgenres");

            setBookGenres(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Book Genres");

        }

    };

    // ===========================
    // Add BookGenre
    // ===========================

    const addBookGenre = async () => {

        try {

            const response = await API.get("/bookgenres_add", {

                params: {

                    bookgenre_id: Number(bookGenreId),
                    book_id: Number(bookId),
                    genre_id: Number(genreId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadBookGenres();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Add Book Genre");

        }

    };

    // ===========================
    // Update BookGenre
    // ===========================

    const updateBookGenre = async () => {

        try {

            const response = await API.get("/bookgenres_update", {

                params: {

                    bookgenre_id: Number(bookGenreId),
                    book_id: Number(bookId),
                    genre_id: Number(genreId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadBookGenres();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Update Book Genre");

        }

    };

    // ===========================
    // Delete BookGenre
    // ===========================

    const deleteBookGenre = async () => {

        try {

            const response = await API.get("/bookgenres_delete", {

                params: {

                    bookgenre_id: Number(bookGenreId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadBookGenres();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Delete Book Genre");

        }

    };

    // ===========================
    // Search BookGenre
    // ===========================

    const searchBookGenre = async () => {

        try {

            const response = await API.get("/bookgenres_search", {

                params: {

                    bookgenre_id: Number(bookGenreId)

                }

            });

            setBookId(response.data.book_id);
            setGenreId(response.data.genre_id);

        }

        catch (error) {

            console.log(error);

            alert("Book Genre Not Found");

        }

    };

    // ===========================
    // Clear Form
    // ===========================

    const clearForm = () => {

        setBookGenreId("");
        setBookId("");
        setGenreId("");

    };
        return (

        <Layout>

            <div className="form-container">

                <h2 className="form-title">

                    Book Genres Management

                </h2>

                <div className="form-row">

                    <FormInput
                        type="number"
                        placeholder="BookGenre ID"
                        value={bookGenreId}
                        onChange={(e) => setBookGenreId(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Book ID"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Genre ID"
                        value={genreId}
                        onChange={(e) => setGenreId(e.target.value)}
                    />

                </div>

                <div className="action-buttons">

                    <PrimaryButton
                        text="Add"
                        color="success"
                        onClick={addBookGenre}
                    />

                    <PrimaryButton
                        text="Update"
                        color="primary"
                        onClick={updateBookGenre}
                    />

                    <PrimaryButton
                        text="Delete"
                        color="danger"
                        onClick={deleteBookGenre}
                    />

                    <PrimaryButton
                        text="Search"
                        color="warning"
                        onClick={searchBookGenre}
                    />

                    <PrimaryButton
                        text="Clear"
                        color="secondary"
                        onClick={clearForm}
                    />

                    <PrimaryButton
                        text="Refresh"
                        color="info"
                        onClick={loadBookGenres}
                    />

                </div>

            </div>

            <div className="table-responsive">

                <DataTable

                    columns={[

                        "BookGenre ID",
                        "Book ID",
                        "Genre ID"

                    ]}

                    data={bookGenres}

                />

            </div>

        </Layout>

    );

}

export default BookGenres;
