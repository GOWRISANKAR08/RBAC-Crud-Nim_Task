import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Login from "./pages/auth/Login";
import ProtectedRoute from "./routes/ProtectedRoute";
import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import EmployeeList from "./pages/employees/EmployeeList";
import EmployeeCreate from "./pages/employees/EmployeeCreate";
import EmployeeEdit from "./pages/employees/EmployeeEdit";
import MonitoringList from "./pages/monitoring/MonitoringList";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Public route */}
                <Route
                    path="/login"
                    element={<Login />}
                />

                {/* Protected routes wrapped in Layout */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    
                    <Route path="employees" element={<EmployeeList />} />
                    <Route path="employees/create" element={<EmployeeCreate />} />
                    <Route path="employees/edit/:id" element={<EmployeeEdit />} />
                    
                    <Route path="monitoring" element={<MonitoringList />} />
                </Route>

                {/* Default route */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;