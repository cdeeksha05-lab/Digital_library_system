import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import DataTable from "../components/DataTable";
import API from "../services/api";
import "../styles/Form.css";
import "../styles/Table.css";
import "../styles/Buttons.css";

function Loans() {

    const [loanId, setLoanId] = useState("");
    const [userId, setUserId] = useState("");
    const [bookId, setBookId] = useState("");
    const [loanDate, setLoanDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const [loans, setLoans] = useState([]);

    useEffect(() => {

        loadLoans();

    }, []);

    // ===========================
    // Load Loans
    // ===========================

    const loadLoans = async () => {

        try {

            const response = await API.get("/loans");

            setLoans(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Loans");

        }

    };

    // ===========================
    // Add Loan
    // ===========================

    const addLoan = async () => {

        try {

            const response = await API.get("/loans_add", {

                params: {

                    loan_id: Number(loanId),
                    user_id: Number(userId),
                    book_id: Number(bookId),
                    loan_date: loanDate,
                    return_date: returnDate

                }

            });

            alert(response.data.message);

            clearForm();

            loadLoans();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Add Loan");

        }

    };

    // ===========================
    // Update Loan
    // ===========================

    const updateLoan = async () => {

        try {

            const response = await API.get("/loans_update", {

                params: {

                    loan_id: Number(loanId),
                    user_id: Number(userId),
                    book_id: Number(bookId),
                    loan_date: loanDate,
                    return_date: returnDate

                }

            });

            alert(response.data.message);

            clearForm();

            loadLoans();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Update Loan");

        }

    };

    // ===========================
    // Delete Loan
    // ===========================

    const deleteLoan = async () => {

        try {

            const response = await API.get("/loans_delete", {

                params: {

                    loan_id: Number(loanId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadLoans();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Delete Loan");

        }

    };

    // ===========================
    // Search Loan
    // ===========================

    const searchLoan = async () => {

        try {

            const response = await API.get("/loans_search", {

                params: {

                    loan_id: Number(loanId)

                }

            });

            setUserId(response.data.user_id);
            setBookId(response.data.book_id);
            setLoanDate(response.data.loan_date);
            setReturnDate(response.data.return_date);

        }

        catch (error) {

            console.log(error);

            alert("Loan Not Found");

        }

    };

    // ===========================
    // Clear Form
    // ===========================

    const clearForm = () => {

        setLoanId("");
        setUserId("");
        setBookId("");
        setLoanDate("");
        setReturnDate("");

    };
        return (

        <Layout>

            <div className="form-container">

                <h2 className="form-title">

                    Loans Management

                </h2>

                <div className="form-row">

                    <FormInput
                        type="number"
                        placeholder="Loan ID"
                        value={loanId}
                        onChange={(e) => setLoanId(e.target.value)}
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
                        placeholder="Loan Date"
                        value={loanDate}
                        onChange={(e) => setLoanDate(e.target.value)}
                    />

                    <FormInput
                        type="date"
                        placeholder="Return Date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                    />

                </div>

                <div className="action-buttons">

                    <PrimaryButton
                        text="Add"
                        color="success"
                        onClick={addLoan}
                    />

                    <PrimaryButton
                        text="Update"
                        color="primary"
                        onClick={updateLoan}
                    />

                    <PrimaryButton
                        text="Delete"
                        color="danger"
                        onClick={deleteLoan}
                    />

                    <PrimaryButton
                        text="Search"
                        color="warning"
                        onClick={searchLoan}
                    />

                    <PrimaryButton
                        text="Clear"
                        color="secondary"
                        onClick={clearForm}
                    />

                    <PrimaryButton
                        text="Refresh"
                        color="info"
                        onClick={loadLoans}
                    />

                </div>

            </div>

            <div className="table-responsive">

                <DataTable

                    columns={[

                        "Loan ID",
                        "User ID",
                        "Book ID",
                        "Loan Date",
                        "Return Date"

                    ]}

                    data={loans}

                />

            </div>

        </Layout>

    );

}

export default Loans;
