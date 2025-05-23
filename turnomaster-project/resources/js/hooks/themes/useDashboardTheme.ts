import { useState, useEffect } from 'react';

const THEME_KEY = 'theme';
const DEFAULT_THEME = 'reyes';

export default function useDashboardTheme() {
    const [theme, setTheme] = useState(() => {
        const storedTheme = localStorage.getItem(THEME_KEY);
        if (storedTheme === null) {
            localStorage.setItem(THEME_KEY, DEFAULT_THEME);
            return DEFAULT_THEME;
        }
        return storedTheme;
    });

    useEffect(() => {
        localStorage.setItem(THEME_KEY, theme);
    }, [theme]);

    return theme;
}