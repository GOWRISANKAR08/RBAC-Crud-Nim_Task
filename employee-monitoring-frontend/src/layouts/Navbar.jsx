import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const { employee, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <header style={{ height: "60px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 2rem", background: "var(--bg)" }}>
            <div style={{ fontWeight: 600, fontSize: "16px", color: "var(--text-h)" }}>
                Employee Monitoring
            </div>
            
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {employee && (
                    <span style={{ fontSize: "14px", color: "var(--text)" }}>
                        {employee.name} ({employee.role})
                    </span>
                )}
                
                <button 
                    onClick={handleLogout}
                    style={{
                        padding: "0.5rem 1rem",
                        border: "1px solid var(--border)",
                        background: "var(--code-bg)",
                        borderRadius: "4px",
                        cursor: "pointer",
                        color: "var(--text-h)"
                    }}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}
