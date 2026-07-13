import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import API from "../services/api";
import "../styles/Dashboard.css";

function Dashboard() {

    const [dashboard, setDashboard] = useState({

        authors: 0,
        books: 0,
        users: 0,
        publishers: 0,
        genres: 0,
        bookgenres: 0,
        loans: 0,
        reservations: 0,
        reviews: 0,
        fines: 0

    });

    useEffect(() => {

        API.get("/dashboard")

            .then((response) => {

                setDashboard(response.data);

            })

            .catch((error) => {

                console.log(error);

            });

    }, []);

    return (

        <Layout>

            <h2 className="welcome">

                Welcome to Digital Library Management System

            </h2>

            <div className="dashboard">

                <DashboardCard
                    title="Authors"
                    value={dashboard.authors}
                    color="#007bff"
                />

                <DashboardCard
                    title="Books"
                    value={dashboard.books}
                    color="#28a745"
                />

                <DashboardCard
                    title="Users"
                    value={dashboard.users}
                    color="#17a2b8"
                />

                <DashboardCard
                    title="Publishers"
                    value={dashboard.publishers}
                    color="#ffc107"
                />

                <DashboardCard
                    title="Genres"
                    value={dashboard.genres}
                    color="#dc3545"
                />

                <DashboardCard
                    title="Book Genres"
                    value={dashboard.bookgenres}
                    color="#6f42c1"
                />

                <DashboardCard
                    title="Loans"
                    value={dashboard.loans}
                    color="#20c997"
                />

                <DashboardCard
                    title="Reservations"
                    value={dashboard.reservations}
                    color="#fd7e14"
                />

                <DashboardCard
                    title="Reviews"
                    value={dashboard.reviews}
                    color="#6610f2"
                />

                <DashboardCard
                    title="Fines"
                    value={dashboard.fines}
                    color="#e83e8c"
                />

            </div>

        </Layout>

    );

}

export default Dashboard;