import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function EmployeeList() {
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const { employee } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await api.get("employees/");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this employee?")) return;
        try {
            await api.delete(`employees/${id}/`);
            fetchEmployees();
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert("Failed to delete employee.");
        }
    };

    if (loading) return <div style={{ padding: "2rem" }}>Loading employees...</div>;

    const btnStyle = {
        padding: "0.5rem 1rem",
        background: "var(--accent)",
        color: "white",
        textDecoration: "none",
        borderRadius: "4px",
        fontWeight: 500,
        fontSize: "14px",
        border: "none",
        cursor: "pointer",
        fontFamily: "inherit"
    };

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h1 style={{ marginTop: 0, fontSize: "20px" }}>Employees</h1>
                
                {/* LOGIC FOR DIFFERENT ROLES */}
                {employee?.role === "Admin" || employee?.role === "Manager" ? (
                    <Link to="/employees/create" style={btnStyle}>+ Add Employee</Link>
                ) : null}
            </div>

            {/* REST OF YOUR TABLE REMAINS THE SAME */}
            <div style={{ background: "var(--code-bg)", borderRadius: "8px", border: "1px solid var(--border)", overflow: "hidden", fontSize: "14px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Employee ID</th>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Name</th>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Email</th>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Role</th>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Department</th>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Status</th>
                            {employee?.role === "Admin" || employee?.role === "Manager" ? (
                                <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Actions</th>
                            ) : null}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(emp => (
                            <tr key={emp.id} style={{ borderBottom: "1px solid var(--border)" }}>
                                <td style={{ padding: "0.75rem 1rem", color: "var(--text)" }}>{emp.employee_id}</td>
                                <td style={{ padding: "0.75rem 1rem", color: "var(--text)" }}>{emp.name}</td>
                                <td style={{ padding: "0.75rem 1rem", color: "var(--text)" }}>{emp.email}</td>
                                <td style={{ padding: "0.75rem 1rem", color: "var(--text)" }}>
                                    <span style={{
                                        background: "var(--bg)",
                                        padding: "0.25rem 0.5rem",
                                        borderRadius: "4px",
                                        fontSize: "0.875rem",
                                        border: "1px solid var(--border)"
                                    }}>
                                        {emp.role_name || "Employee"}
                                    </span>
                                </td>
                                <td style={{ padding: "0.75rem 1rem", color: "var(--text)" }}>{emp.department || "-"}</td>
                                <td style={{ padding: "0.75rem 1rem", color: "var(--text)" }}>
                                    <span style={{
                                        color: emp.is_active ? "#10b981" : "#ef4444",
                                        fontWeight: 500
                                    }}>
                                        {emp.is_active ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                {employee?.role === "Admin" || employee?.role === "Manager" ? (
                                    <td style={{ padding: "0.75rem 1rem", display: "flex", gap: "0.5rem" }}>
                                        <Link to={`/employees/edit/${emp.id}`} style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "0.4rem",
                                            color: "var(--accent)",
                                            textDecoration: "none",
                                            borderRadius: "4px",
                                            cursor: "pointer",
                                            border: "1px solid transparent"
                                        }} title="Edit">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M12 20h9"></path>
                                                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                                            </svg>
                                        </Link>
                                        <button onClick={() => handleDelete(emp.id)} style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            padding: "0.4rem",
                                            background: "transparent",
                                            color: "#ef4444",
                                            border: "1px solid transparent",
                                            borderRadius: "4px",
                                            cursor: "pointer"
                                        }} title="Delete">
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="3 6 5 6 21 6"></polyline>
                                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                                <line x1="10" y1="11" x2="10" y2="17"></line>
                                                <line x1="14" y1="11" x2="14" y2="17"></line>
                                            </svg>
                                        </button>
                                    </td>
                                ) : null}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
