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
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '/auth/login';
        return null;
    }

    const decoded = parseJwt(token);
    if (!decoded || !decoded.exp || decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        window.location.href = '/auth/login';
        return null;
    }

    return children;
}
