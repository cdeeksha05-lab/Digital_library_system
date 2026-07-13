import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import DataTable from "../components/DataTable";
import API from "../services/api";
import "../styles/Form.css";
import "../styles/Table.css";
import "../styles/Buttons.css";

function Books() {

    const [bookId, setBookId] = useState("");
    const [title, setTitle] = useState("");
    const [authorId, setAuthorId] = useState("");
    const [publisherId, setPublisherId] = useState("");
    const [publicationYear, setPublicationYear] = useState("");
    const [price, setPrice] = useState("");

    const [books, setBooks] = useState([]);

    useEffect(() => {

        loadBooks();

    }, []);

    // ===========================
    // Load Books
    // ===========================

    const loadBooks = async () => {

        try {

            const response = await API.get("/books");

            setBooks(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Books");

        }

    };

    // ===========================
    // Add Book
    // ===========================

    const addBook = async () => {

        try {

            const response = await API.get("/books_add", {

                params: {

                    book_id: Number(bookId),
                    title: title,
                    author_id: Number(authorId),
                    publisher_id: Number(publisherId),
                    publication_year: Number(publicationYear),
                    price: Number(price)

                }

            });

            alert(response.data.message);

            clearForm();

            loadBooks();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Add Book");

        }

    };

    // ===========================
    // Update Book
    // ===========================

    const updateBook = async () => {

        try {

            const response = await API.get("/books_update", {

                params: {

                    book_id: Number(bookId),
                    title: title,
                    author_id: Number(authorId),
                    publisher_id: Number(publisherId),
                    publication_year: Number(publicationYear),
                    price: Number(price)

                }

            });

            alert(response.data.message);

            clearForm();

            loadBooks();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Update Book");

        }

    };

    // ===========================
    // Delete Book
    // ===========================

    const deleteBook = async () => {

        try {

            const response = await API.get("/books_delete", {

                params: {

                    book_id: Number(bookId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadBooks();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Delete Book");

        }

    };

    // ===========================
    // Search Book
    // ===========================

    const searchBook = async () => {

        try {

            const response = await API.get("/books_search", {

                params: {

                    book_id: Number(bookId)

                }

            });

            setTitle(response.data.title);
            setAuthorId(response.data.author_id);
            setPublisherId(response.data.publisher_id);
            setPublicationYear(response.data.publication_year);
            setPrice(response.data.price);

        }

        catch (error) {

            console.log(error);

            alert("Book Not Found");

        }

    };

    // ===========================
    // Clear Form
    // ===========================

    const clearForm = () => {

        setBookId("");
        setTitle("");
        setAuthorId("");
        setPublisherId("");
        setPublicationYear("");
        setPrice("");

    };
        return (

        <Layout>

            <div className="form-container">

                <h2 className="form-title">
                    Books Management
                </h2>

                <div className="form-row">

                    <FormInput
                        type="number"
                        placeholder="Book ID"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Author ID"
                        value={authorId}
                        onChange={(e) => setAuthorId(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Publisher ID"
                        value={publisherId}
                        onChange={(e) => setPublisherId(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Publication Year"
                        value={publicationYear}
                        onChange={(e) => setPublicationYear(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />

                </div>

                <div className="action-buttons">

                    <PrimaryButton
                        text="Add"
                        color="success"
                        onClick={addBook}
                    />

                    <PrimaryButton
                        text="Update"
                        color="primary"
                        onClick={updateBook}
                    />

                    <PrimaryButton
                        text="Delete"
                        color="danger"
                        onClick={deleteBook}
                    />

                    <PrimaryButton
                        text="Search"
                        color="warning"
                        onClick={searchBook}
                    />

                    <PrimaryButton
                        text="Clear"
                        color="secondary"
                        onClick={clearForm}
                    />

                    <PrimaryButton
                        text="Refresh"
                        color="info"
                        onClick={loadBooks}
                    />

                </div>

            </div>

            <div className="table-responsive">

                <DataTable

                    columns={[

                        "Book ID",
                        "Title",
                        "Author ID",
                        "Publisher ID",
                        "Publication Year",
                        "Price"

                    ]}

                    data={books}

                />

            </div>

        </Layout>

    );

}

export default Books;
