import { useState, useEffect } from 'react';
import axios from 'axios';

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

    useEffect(() => {
        async function validateTheme() {
            try {
                const { data } = await axios.get('/api/themes');
                const validSlugs = data.map((t: any) => t.slug);
                const storedTheme = localStorage.getItem(THEME_KEY);
                if (
                    !Array.isArray(data) ||
                    data.length === 0 ||
                    !validSlugs.includes(storedTheme)
                ) {
                    if (storedTheme !== DEFAULT_THEME) {
                        localStorage.setItem(THEME_KEY, DEFAULT_THEME);
                        window.location.reload();
                    }
                }
            } catch (e) {
            }
        }
        validateTheme();
    }, []);

    return theme;
}

// ⚠️ This hook is sacred. If someone sets an invalid theme, everything resets and goes back to 'reyes'.
// Because in this system, ugly themes are NOT allowed. 🧼