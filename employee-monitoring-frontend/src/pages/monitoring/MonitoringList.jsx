import { useState, useEffect } from "react";
import api from "../../services/api";

export default function MonitoringList() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await api.get("monitoring/");
                setLogs(response.data);
            } catch (error) {
                console.error("Error fetching monitoring logs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    const getActivityBadgeColor = (type) => {
        switch (type) {
            case "login": return { bg: "rgba(34, 197, 94, 0.2)", text: "#16a34a" };
            case "logout": return { bg: "rgba(107, 114, 128, 0.2)", text: "#4b5563" };
            case "active": return { bg: "rgba(59, 130, 246, 0.2)", text: "#2563eb" };
            case "idle": return { bg: "rgba(245, 158, 11, 0.2)", text: "#d97706" };
            default: return { bg: "rgba(156, 163, 175, 0.2)", text: "#6b7280" };
        }
    };

    if (loading) return <div style={{ padding: "2rem" }}>Loading monitoring logs...</div>;

    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                <h1 style={{ marginTop: 0, fontSize: "24px" }}>Monitoring Logs</h1>
            </div>

            <div style={{ background: "var(--code-bg)", borderRadius: "8px", border: "1px solid var(--border)", overflow: "hidden", fontSize: "14px" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
                    <thead>
                        <tr style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Date & Time</th>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Employee Name</th>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Employee ID</th>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Activity Type</th>
                            <th style={{ padding: "0.75rem 1rem", fontWeight: 600, color: "var(--text-h)" }}>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {logs.map(log => {
                            const badge = getActivityBadgeColor(log.activity_type);
                            
                            return (
                                <tr key={log.id} style={{ borderBottom: "1px solid var(--border)" }}>
                                    <td style={{ padding: "1rem" }}>
                                        {new Date(log.timestamp).toLocaleString()}
                                    </td>
                                    <td style={{ padding: "1rem", color: "var(--text-h)", fontWeight: 500 }}>
                                        {log.employee_name}
                                    </td>
                                    <td style={{ padding: "1rem", fontFamily: "var(--mono)" }}>
                                        {log.employee_code}
                                    </td>
                                    <td style={{ padding: "1rem" }}>
                                        <span style={{
                                            padding: "0.25rem 0.6rem",
                                            borderRadius: "1rem",
                                            fontSize: "12px",
                                            fontWeight: 600,
                                            textTransform: "capitalize",
                                            background: badge.bg,
                                            color: badge.text
                                        }}>
                                            {log.activity_type}
                                        </span>
                                    </td>
                                    <td style={{ padding: "1rem", color: "var(--text)" }}>
                                        {log.description || "-"}
                                    </td>
                                </tr>
                            );
                        })}
                        
                        {logs.length === 0 && (
                            <tr>
                                <td colSpan="5" style={{ padding: "2rem", textAlign: "center" }}>
                                    No monitoring logs found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
