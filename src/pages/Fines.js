import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import DataTable from "../components/DataTable";
import API from "../services/api";
import "../styles/Form.css";
import "../styles/Table.css";
import "../styles/Buttons.css";

function Fines() {

    const [fineId, setFineId] = useState("");
    const [loanId, setLoanId] = useState("");
    const [amount, setAmount] = useState("");
    const [paidStatus, setPaidStatus] = useState("");

    const [fines, setFines] = useState([]);

    useEffect(() => {

        loadFines();

    }, []);

    // ===========================
    // Load Fines
    // ===========================

    const loadFines = async () => {

        try {

            const response = await API.get("/fines");

            setFines(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Fines");

        }

    };

    // ===========================
    // Add Fine
    // ===========================

    const addFine = async () => {

        try {

            const response = await API.get("/fines_add", {

                params: {

                    fine_id: Number(fineId),
                    loan_id: Number(loanId),
                    amount: Number(amount),
                    paid_status: paidStatus

                }

            });

            alert(response.data.message);

            clearForm();

            loadFines();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Add Fine");

        }

    };

    // ===========================
    // Update Fine
    // ===========================

    const updateFine = async () => {

        try {

            const response = await API.get("/fines_update", {

                params: {

                    fine_id: Number(fineId),
                    loan_id: Number(loanId),
                    amount: Number(amount),
                    paid_status: paidStatus

                }

            });

            alert(response.data.message);

            clearForm();

            loadFines();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Update Fine");

        }

    };

    // ===========================
    // Delete Fine
    // ===========================

    const deleteFine = async () => {

        try {

            const response = await API.get("/fines_delete", {

                params: {

                    fine_id: Number(fineId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadFines();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Delete Fine");

        }

    };

    // ===========================
    // Search Fine
    // ===========================

    const searchFine = async () => {

        try {

            const response = await API.get("/fines_search", {

                params: {

                    fine_id: Number(fineId)

                }

            });

            setLoanId(response.data.loan_id);
            setAmount(response.data.amount);
            setPaidStatus(response.data.paid_status);

        }

        catch (error) {

            console.log(error);

            alert("Fine Not Found");

        }

    };

    // ===========================
    // Clear Form
    // ===========================

    const clearForm = () => {

        setFineId("");
        setLoanId("");
        setAmount("");
        setPaidStatus("");

    };
        return (

        <Layout>

            <div className="form-container">

                <h2 className="form-title">

                    Fines Management

                </h2>

                <div className="form-row">

                    <FormInput
                        type="number"
                        placeholder="Fine ID"
                        value={fineId}
                        onChange={(e) => setFineId(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Loan ID"
                        value={loanId}
                        onChange={(e) => setLoanId(e.target.value)}
                    />

                    <FormInput
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Paid Status"
                        value={paidStatus}
                        onChange={(e) => setPaidStatus(e.target.value)}
                    />

                </div>

                <div className="action-buttons">

                    <PrimaryButton
                        text="Add"
                        color="success"
                        onClick={addFine}
                    />

                    <PrimaryButton
                        text="Update"
                        color="primary"
                        onClick={updateFine}
                    />

                    <PrimaryButton
                        text="Delete"
                        color="danger"
                        onClick={deleteFine}
                    />

                    <PrimaryButton
                        text="Search"
                        color="warning"
                        onClick={searchFine}
                    />

                    <PrimaryButton
                        text="Clear"
                        color="secondary"
                        onClick={clearForm}
                    />

                    <PrimaryButton
                        text="Refresh"
                        color="info"
                        onClick={loadFines}
                    />

                </div>

            </div>

            <div className="table-responsive">

                <DataTable

                    columns={[

                        "Fine ID",
                        "Loan ID",
                        "Amount",
                        "Paid Status"

                    ]}

                    data={fines}

                />

            </div>

        </Layout>

    );

}

export default Fines;
