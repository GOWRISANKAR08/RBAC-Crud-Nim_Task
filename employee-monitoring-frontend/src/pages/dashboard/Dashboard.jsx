import { useAuth } from "../../context/AuthContext";

export default function Dashboard() {
    const { employee } = useAuth();

    return (
        <div>
            <h1 style={{ marginTop: 0, fontSize: "32px" }}>Dashboard</h1>
            
            <div style={{ 
                background: "var(--code-bg)", 
                padding: "1.5rem", 
                borderRadius: "8px", 
                border: "1px solid var(--border)",
                marginTop: "1.5rem"
            }}>
                <h2 style={{ margin: "0 0 1rem 0", fontSize: "20px" }}>Welcome back, {employee?.name}!</h2>
                <p style={{ color: "var(--text)" }}>
                    This is your main dashboard. From here, you can navigate using the sidebar to view employee records or monitor activities.
                </p>
            </div>
        </div>
    );
}
