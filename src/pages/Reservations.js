import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import DataTable from "../components/DataTable";
import API from "../services/api";
import "../styles/Form.css";
import "../styles/Table.css";
import "../styles/Buttons.css";

function Reservations() {

    const [reservationId, setReservationId] = useState("");
    const [userId, setUserId] = useState("");
    const [bookId, setBookId] = useState("");
    const [reservationDate, setReservationDate] = useState("");
    const [status, setStatus] = useState("");

    const [reservations, setReservations] = useState([]);

    useEffect(() => {

        loadReservations();

    }, []);

    // ===========================
    // Load Reservations
    // ===========================

    const loadReservations = async () => {

        try {

            const response = await API.get("/reservations");

            setReservations(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Reservations");

        }

    };

    // ===========================
    // Add Reservation
    // ===========================

    const addReservation = async () => {

        try {

            const response = await API.get("/reservations_add", {

                params: {

                    reservation_id: Number(reservationId),
                    user_id: Number(userId),
                    book_id: Number(bookId),
                    reservation_date: reservationDate,
                    status: status

                }

            });

            alert(response.data.message);

            clearForm();

            loadReservations();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Add Reservation");

        }

    };

    // ===========================
    // Update Reservation
    // ===========================

    const updateReservation = async () => {

        try {

            const response = await API.get("/reservations_update", {

                params: {

                    reservation_id: Number(reservationId),
                    user_id: Number(userId),
                    book_id: Number(bookId),
                    reservation_date: reservationDate,
                    status: status

                }

            });

            alert(response.data.message);

            clearForm();

            loadReservations();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Update Reservation");

        }

    };

    // ===========================
    // Delete Reservation
    // ===========================

    const deleteReservation = async () => {

        try {

            const response = await API.get("/reservations_delete", {

                params: {

                    reservation_id: Number(reservationId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadReservations();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Delete Reservation");

        }

    };

    // ===========================
    // Search Reservation
    // ===========================

    const searchReservation = async () => {

        try {

            const response = await API.get("/reservations_search", {

                params: {

                    reservation_id: Number(reservationId)

                }

            });

            setUserId(response.data.user_id);
            setBookId(response.data.book_id);
            setReservationDate(response.data.reservation_date);
            setStatus(response.data.status);

        }

        catch (error) {

            console.log(error);

            alert("Reservation Not Found");

        }

    };

    // ===========================
    // Clear Form
    // ===========================

    const clearForm = () => {

        setReservationId("");
        setUserId("");
        setBookId("");
        setReservationDate("");
        setStatus("");

    };
        return (

        <Layout>

            <div className="form-container">

                <h2 className="form-title">

                    Reservations Management

                </h2>

                <div className="form-row">

                    <FormInput
                        type="number"
                        placeholder="Reservation ID"
                        value={reservationId}
                        onChange={(e) => setReservationId(e.target.value)}
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
                        type="date"
                        placeholder="Reservation Date"
                        value={reservationDate}
                        onChange={(e) => setReservationDate(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    />

                </div>

                <div className="action-buttons">

                    <PrimaryButton
                        text="Add"
                        color="success"
                        onClick={addReservation}
                    />

                    <PrimaryButton
                        text="Update"
                        color="primary"
                        onClick={updateReservation}
                    />

                    <PrimaryButton
                        text="Delete"
                        color="danger"
                        onClick={deleteReservation}
                    />

                    <PrimaryButton
                        text="Search"
                        color="warning"
                        onClick={searchReservation}
                    />

                    <PrimaryButton
                        text="Clear"
                        color="secondary"
                        onClick={clearForm}
                    />

                    <PrimaryButton
                        text="Refresh"
                        color="info"
                        onClick={loadReservations}
                    />

                </div>

            </div>

            <div className="table-responsive">

                <DataTable

                    columns={[

                        "Reservation ID",
                        "User ID",
                        "Book ID",
                        "Reservation Date",
                        "Status"

                    ]}

                    data={reservations}

                />

            </div>

        </Layout>

    );

}

export default Reservations;