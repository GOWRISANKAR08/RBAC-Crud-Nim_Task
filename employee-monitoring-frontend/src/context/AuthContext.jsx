import {
    createContext,
    useContext,
    useState,
} from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {

    const [employee, setEmployee] = useState(() => {
        const storedEmployee = localStorage.getItem("employee");

        if (storedEmployee) {
            return JSON.parse(storedEmployee);
        }

        return null;
    });

    const login = (data) => {

        localStorage.setItem(
            "access_token",
            data.access_token
        );

        localStorage.setItem(
            "refresh_token",
            data.refresh_token
        );

        localStorage.setItem(
            "employee",
            JSON.stringify(data.employee)
        );

        setEmployee(data.employee);
    };

    const logout = () => {

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("employee");

        setEmployee(null);
    };

    const isAuthenticated =
        Boolean(localStorage.getItem("access_token"));

    return (
        <AuthContext.Provider
            value={{
                employee,
                isAuthenticated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}