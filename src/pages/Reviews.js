import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import DataTable from "../components/DataTable";
import API from "../services/api";
import "../styles/Form.css";
import "../styles/Table.css";
import "../styles/Buttons.css";

function Reviews() {

    const [reviewId, setReviewId] = useState("");
    const [userId, setUserId] = useState("");
    const [bookId, setBookId] = useState("");
    const [rating, setRating] = useState("");
    const [comments, setComments] = useState("");

    const [reviews, setReviews] = useState([]);

    useEffect(() => {

        loadReviews();

    }, []);

    // ===========================
    // Load Reviews
    // ===========================

    const loadReviews = async () => {

        try {

            const response = await API.get("/reviews");

            setReviews(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Reviews");

        }

    };

    // ===========================
    // Add Review
    // ===========================

    const addReview = async () => {

        try {

            const response = await API.get("/reviews_add", {

                params: {

                    review_id: Number(reviewId),
                    user_id: Number(userId),
                    book_id: Number(bookId),
                    rating: Number(rating),
                    comments: comments

                }

            });

            alert(response.data.message);

            clearForm();

            loadReviews();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Add Review");

        }

    };

    // ===========================
    // Update Review
    // ===========================

    const updateReview = async () => {

        try {

            const response = await API.get("/reviews_update", {

                params: {

                    review_id: Number(reviewId),
                    user_id: Number(userId),
                    book_id: Number(bookId),
                    rating: Number(rating),
                    comments: comments

                }

            });

            alert(response.data.message);

            clearForm();

            loadReviews();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Update Review");

        }

    };

    // ===========================
    // Delete Review
    // ===========================

    const deleteReview = async () => {

        try {

            const response = await API.get("/reviews_delete", {

                params: {

                    review_id: Number(reviewId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadReviews();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Delete Review");

        }

    };

    // ===========================
    // Search Review
    // ===========================

    const searchReview = async () => {

        try {

            const response = await API.get("/reviews_search", {

                params: {

                    review_id: Number(reviewId)

                }

            });

            setUserId(response.data.user_id);
            setBookId(response.data.book_id);
            setRating(response.data.rating);
            setComments(response.data.comments);

        }

        catch (error) {

            console.log(error);

            alert("Review Not Found");

        }

    };

    // ===========================
    // Clear Form
    // ===========================

    const clearForm = () => {

        setReviewId("");
        setUserId("");
        setBookId("");
        setRating("");
        setComments("");

    };
        return (

        <Layout>

            <div className="form-container">

                <h2 className="form-title">

                    Reviews Management

                </h2>

                <div className="form-row">

                    <FormInput
                        type="number"
                        placeholder="Review ID"
                        value={reviewId}
                        onChange={(e) => setReviewId(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="User ID"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Book ID"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Rating"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Comments"
                        value={comments}
                        onChange={(e) => setComments(e.target.value)}
                    />

                </div>

                <div className="action-buttons">

                    <PrimaryButton
                        text="Add"
                        color="success"
                        onClick={addReview}
                    />

                    <PrimaryButton
                        text="Update"
                        color="primary"
                        onClick={updateReview}
                    />

                    <PrimaryButton
                        text="Delete"
                        color="danger"
                        onClick={deleteReview}
                    />

                    <PrimaryButton
                        text="Search"
                        color="warning"
                        onClick={searchReview}
                    />

                    <PrimaryButton
                        text="Clear"
                        color="secondary"
                        onClick={clearForm}
                    />

                    <PrimaryButton
                        text="Refresh"
                        color="info"
                        onClick={loadReviews}
                    />

                </div>

            </div>

            <div className="table-responsive">

                <DataTable

                    columns={[

                        "Review ID",
                        "User ID",
                        "Book ID",
                        "Rating",
                        "Comments"

                    ]}

                    data={reviews}

                />

            </div>

        </Layout>

    );

}

export default Reviews;
