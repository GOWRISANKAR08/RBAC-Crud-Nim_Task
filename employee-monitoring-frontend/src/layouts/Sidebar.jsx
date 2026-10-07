import { NavLink } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside style={{ width: "220px", borderRight: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: "1rem", background: "var(--code-bg)" }}>
            <h2 style={{ fontSize: "14px", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "1.5rem", color: "var(--text-h)" }}>System</h2>
            
            <nav style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                <NavLink 
                    to="/dashboard" 
                    style={({ isActive }) => ({
                        padding: "0.5rem 0.75rem",
                        textDecoration: "none",
                        fontSize: "13px",
                        color: isActive ? "white" : "var(--text)",
                        background: isActive ? "var(--accent)" : "transparent",
                        borderRadius: "4px",
                        fontWeight: 500
                    })}
                >
                    Dashboard
                </NavLink>

                <NavLink 
                    to="/employees" 
                    style={({ isActive }) => ({
                        padding: "0.5rem 0.75rem",
                        textDecoration: "none",
                        fontSize: "13px",
                        color: isActive ? "white" : "var(--text)",
                        background: isActive ? "var(--accent)" : "transparent",
                        borderRadius: "4px",
                        fontWeight: 500
                    })}
                >
                    Employees
                </NavLink>

                <NavLink 
                    to="/monitoring" 
                    style={({ isActive }) => ({
                        padding: "0.5rem 0.75rem",
                        textDecoration: "none",
                        fontSize: "13px",
                        color: isActive ? "white" : "var(--text)",
                        background: isActive ? "var(--accent)" : "transparent",
                        borderRadius: "4px",
                        fontWeight: 500
                    })}
                >
                    Monitoring Logs
                </NavLink>
            </nav>
        </aside>
    );
}
