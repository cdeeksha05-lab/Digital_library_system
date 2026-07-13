import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

function DashboardChart({ counts }) {

    const labels = [
        "Authors",
        "Books",
        "Users",
        "Publishers",
        "Genres",
        "Book Genres",
        "Loans",
        "Reservations",
        "Reviews",
        "Fines"
    ];

    const values = [
        counts.authors,
        counts.books,
        counts.users,
        counts.publishers,
        counts.genres,
        counts.bookgenres,
        counts.loans,
        counts.reservations,
        counts.reviews,
        counts.fines
    ];

    const colors = [
        "#0d6efd",
        "#198754",
        "#ffc107",
        "#dc3545",
        "#6f42c1",
        "#20c997",
        "#fd7e14",
        "#6610f2",
        "#0dcaf0",
        "#6c757d"
    ];

    const data = {
        labels,
        datasets: [
            {
                label: "Library Statistics",
                data: values,
                backgroundColor: colors,
                borderColor: colors,
                borderWidth: 1
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Digital Library Statistics"
            }
        }
    };

    return (
        <div>

            <div className="chart-container">
                <Bar data={data} options={options} />
            </div>

            <br />

            <div className="chart-container">
                <Pie data={data} />
            </div>

            <br />

            <div className="chart-container">
                <Line data={data} options={options} />
            </div>

        </div>
    );
}

export default DashboardChart;