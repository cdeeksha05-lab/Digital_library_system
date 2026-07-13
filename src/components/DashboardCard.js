import "../styles/DashboardCard.css";

function DashboardCard({ title, value, color }) {

    return (

        <div
            className="dashboard-card"
            style={{ borderTop: `6px solid ${color}` }}
        >

            <h2>{value}</h2>

            <p>{title}</p>

        </div>

    );

}

export default DashboardCard;