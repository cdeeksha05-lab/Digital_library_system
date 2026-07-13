import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import FormInput from "../components/FormInput";
import PrimaryButton from "../components/PrimaryButton";
import DataTable from "../components/DataTable";
import API from "../services/api";
import "../styles/Form.css";
import "../styles/Table.css";
import "../styles/Buttons.css";

function Publishers() {

    const [publisherId, setPublisherId] = useState("");
    const [publisherName, setPublisherName] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");

    const [publishers, setPublishers] = useState([]);

    useEffect(() => {

        loadPublishers();

    }, []);

    // ===========================
    // Load Publishers
    // ===========================

    const loadPublishers = async () => {

        try {

            const response = await API.get("/publishers");

            setPublishers(response.data);

        }

        catch (error) {

            console.log(error);

            alert("Unable to Load Publishers");

        }

    };

    // ===========================
    // Add Publisher
    // ===========================

    const addPublisher = async () => {

        try {

            const response = await API.get("/publishers_add", {

                params: {

                    publisher_id: Number(publisherId),
                    publisher_name: publisherName,
                    city: city,
                    phone: phone

                }

            });

            alert(response.data.message);

            clearForm();

            loadPublishers();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Add Publisher");

        }

    };

    // ===========================
    // Update Publisher
    // ===========================

    const updatePublisher = async () => {

        try {

            const response = await API.get("/publishers_update", {

                params: {

                    publisher_id: Number(publisherId),
                    publisher_name: publisherName,
                    city: city,
                    phone: phone

                }

            });

            alert(response.data.message);

            clearForm();

            loadPublishers();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Update Publisher");

        }

    };

    // ===========================
    // Delete Publisher
    // ===========================

    const deletePublisher = async () => {

        try {

            const response = await API.get("/publishers_delete", {

                params: {

                    publisher_id: Number(publisherId)

                }

            });

            alert(response.data.message);

            clearForm();

            loadPublishers();

        }

        catch (error) {

            console.log(error);

            alert(error.response?.data?.message || "Unable to Delete Publisher");

        }

    };

    // ===========================
    // Search Publisher
    // ===========================

    const searchPublisher = async () => {

        try {

            const response = await API.get("/publishers_search", {

                params: {

                    publisher_id: Number(publisherId)

                }

            });

            setPublisherName(response.data.publisher_name);
            setCity(response.data.city);
            setPhone(response.data.phone);

        }

        catch (error) {

            console.log(error);

            alert("Publisher Not Found");

        }

    };

    // ===========================
    // Clear Form
    // ===========================

    const clearForm = () => {

        setPublisherId("");
        setPublisherName("");
        setCity("");
        setPhone("");

    };
        return (

        <Layout>

            <div className="form-container">

                <h2 className="form-title">

                    Publishers Management

                </h2>

                <div className="form-row">

                    <FormInput
                        type="number"
                        placeholder="Publisher ID"
                        value={publisherId}
                        onChange={(e) => setPublisherId(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Publisher Name"
                        value={publisherName}
                        onChange={(e) => setPublisherName(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />

                    <FormInput
                        type="text"
                        placeholder="Phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />

                </div>

                <div className="action-buttons">

                    <PrimaryButton
                        text="Add"
                        color="success"
                        onClick={addPublisher}
                    />

                    <PrimaryButton
                        text="Update"
                        color="primary"
                        onClick={updatePublisher}
                    />

                    <PrimaryButton
                        text="Delete"
                        color="danger"
                        onClick={deletePublisher}
                    />

                    <PrimaryButton
                        text="Search"
                        color="warning"
                        onClick={searchPublisher}
                    />

                    <PrimaryButton
                        text="Clear"
                        color="secondary"
                        onClick={clearForm}
                    />

                    <PrimaryButton
                        text="Refresh"
                        color="info"
                        onClick={loadPublishers}
                    />

                </div>

            </div>

            <div className="table-responsive">

                <DataTable

                    columns={[

                        "Publisher ID",
                        "Publisher Name",
                        "City",
                        "Phone"

                    ]}

                    data={publishers}

                />

            </div>

        </Layout>

    );

}

export default Publishers;
