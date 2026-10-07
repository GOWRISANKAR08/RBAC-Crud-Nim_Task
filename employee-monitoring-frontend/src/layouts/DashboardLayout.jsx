import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function DashboardLayout() {
    return (
        <div style={{ display: "flex", minHeight: "100vh", width: "100%", background: "var(--bg)", textAlign: "left" }}>
            <Sidebar />
            <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
                <Navbar />
                <main style={{ flex: 1, padding: "2rem", overflowY: "auto" }}>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
