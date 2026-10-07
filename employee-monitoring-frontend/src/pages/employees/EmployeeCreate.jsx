import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function EmployeeCreate() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        employee_id: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        department: "",
        role: "3", 
        is_active: true
    });

    const roles = [
        { id: 1, name: "Admin" },
        { id: 2, name: "Manager" },
        { id: 3, name: "Employee" }
    ];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post("employees/", formData);
            navigate("/employees");
        } catch (err) {
            console.error(err);
            if (err.response?.data) {
                const msgs = Object.values(err.response.data).flat();
                setError(msgs.join(" "));
            } else {
                setError("Failed to create employee.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
                <Link to="/employees" style={{ color: "var(--text)", textDecoration: "none" }}>← Back</Link>
                <h1 style={{ margin: 0, fontSize: "28px" }}>Add New Employee</h1>
            </div>

            <div style={{ background: "var(--code-bg)", padding: "2rem", borderRadius: "8px", border: "1px solid var(--border)" }}>
                {error && (
                    <div style={{ background: "#fee2e2", color: "#dc2626", padding: "0.75rem", borderRadius: "4px", marginBottom: "1.5rem", fontSize: "14px" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    
                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "var(--text-h)" }}>Employee ID *</label>
                            <input name="employee_id" value={formData.employee_id} onChange={handleChange} required style={inputStyle} />
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "var(--text-h)" }}>Full Name *</label>
                            <input name="name" value={formData.name} onChange={handleChange} required style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "var(--text-h)" }}>Email *</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required style={inputStyle} />
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "var(--text-h)" }}>Password *</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={8} style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "var(--text-h)" }}>Phone (10 digits)</label>
                            <input name="phone" value={formData.phone} onChange={handleChange} pattern="\d{10}" style={inputStyle} />
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "var(--text-h)" }}>Department</label>
                            <input name="department" value={formData.department} onChange={handleChange} style={inputStyle} />
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: "1rem" }}>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <label style={{ fontWeight: 500, fontSize: "14px", color: "var(--text-h)" }}>Role *</label>
                            <select name="role" value={formData.role} onChange={handleChange} required style={inputStyle}>
                                {roles.map(r => (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                ))}
                            </select>
                        </div>
                        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem", justifyContent: "center" }}>
                            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 500, fontSize: "14px", color: "var(--text-h)", cursor: "pointer", marginTop: "1.5rem" }}>
                                <input type="checkbox" name="is_active" checked={formData.is_active} onChange={handleChange} style={{ width: "16px", height: "16px" }} />
                                Active Account
                            </label>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} style={{
                        marginTop: "1rem",
                        padding: "0.75rem",
                        background: "var(--accent)",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontWeight: 600,
                        cursor: loading ? "not-allowed" : "pointer",
                        opacity: loading ? 0.7 : 1
                    }}>
                        {loading ? "Creating..." : "Create Employee"}
                    </button>
                </form>
            </div>
        </div>
    );
}

const inputStyle = {
    padding: "0.75rem",
    borderRadius: "4px",
    border: "1px solid var(--border)",
    background: "var(--bg)",
    color: "var(--text-h)",
    fontSize: "15px"
};
