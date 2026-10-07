import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";

function Login() {
    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        setError("");
        setLoading(true);

        try {
            
            const response = await api.post("auth/login/", {
                email: email,
                password: password,
            });

           
            login(response.data);

            navigate("/dashboard");

        } catch (error) {
            console.error("Login error:", error);

            if (error.response) {
                setError(
                    error.response.data?.detail ||
                    error.response.data?.message ||
                    "Invalid email or password."
                );
            } else {
                setError("Unable to connect to the server.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
            <div style={{ 
                background: "var(--bg)", 
                padding: "2rem", 
                borderRadius: "8px", 
                boxShadow: "var(--shadow)", 
                width: "100%", 
                maxWidth: "400px",
                border: "1px solid var(--border)",
                textAlign: "left"
            }}>
                <h1 style={{ textAlign: "center", marginBottom: "1rem", marginTop: 0, fontSize: "32px" }}>Login</h1>
                
                <p style={{ textAlign: "center", marginBottom: "2rem", color: "var(--text)" }}>
                    Sign in to your account
                </p>

                {error && (
                    <div style={{ background: "#fee2e2", color: "#dc2626", padding: "0.75rem", borderRadius: "4px", marginBottom: "1.5rem", fontSize: "14px" }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
                    
                    {/* Email */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: 500, color: "var(--text-h)", fontSize: "14px" }}>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder="Enter your email"
                            required
                            style={{
                                padding: "0.75rem",
                                borderRadius: "4px",
                                border: "1px solid var(--border)",
                                background: "var(--code-bg)",
                                color: "var(--text-h)",
                                fontSize: "16px"
                            }}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                        <label style={{ fontWeight: 500, color: "var(--text-h)", fontSize: "14px" }}>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="Enter your password"
                            required
                            style={{
                                padding: "0.75rem",
                                borderRadius: "4px",
                                border: "1px solid var(--border)",
                                background: "var(--code-bg)",
                                color: "var(--text-h)",
                                fontSize: "16px"
                            }}
                        />
                    </div>

                    {/* Login button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            padding: "0.75rem",
                            borderRadius: "4px",
                            border: "none",
                            background: "var(--accent)",
                            color: "white",
                            fontSize: "16px",
                            fontWeight: 600,
                            cursor: loading ? "not-allowed" : "pointer",
                            marginTop: "0.5rem",
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;