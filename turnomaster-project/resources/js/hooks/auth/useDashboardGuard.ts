import { useEffect, useState } from "react";
import axios from "axios";
import { JSX } from "react";

function parseJwt(token: string): { exp?: number } | null {
    try {
        const base64Payload = token.split('.')[1];
        const payload = atob(base64Payload);
        return JSON.parse(payload);
    } catch (error) {
        console.error('Failed to parse JWT:', error);
        return null;
    }
}

export function useDashboardGuard(children: JSX.Element): JSX.Element | null {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const verifyAndRefreshToken = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                redirectToLogin();
                return;
            }

            const decoded = parseJwt(token);
            const isExpired = !decoded || !decoded.exp || decoded.exp * 1000 < Date.now();

            if (isExpired) {
                try {
                    axios.defaults.withCredentials = true;
                    const res = await axios.post('/api/refresh'); // Use cookie HttpOnly
                    const newToken = res.data.token;
                    localStorage.setItem('token', newToken);
                    setIsAuthenticated(true);
                } catch (err) {
                    console.warn("Refresh fallido, redirigiendo...");
                    localStorage.removeItem('token');
                    redirectToLogin();
                }
            } else {
                setIsAuthenticated(true);
            }
        };

        verifyAndRefreshToken();
    }, []);

    const redirectToLogin = () => {
        window.location.href = '/auth/login';
        setIsAuthenticated(false);
    };

    if (isAuthenticated === null) {
        return null; // Loading, opcional: mostrar spinner
    }

    return isAuthenticated ? children : null;
}
