import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Appearance = () => {
    const [themes, setThemes] = useState<{ name: string; slug: string; description: string }[]>([]);
    const [currentTheme, setCurrentTheme] = useState<string>(() => localStorage.getItem("theme") || "");
    const [selectedTheme, setSelectedTheme] = useState<string>(currentTheme);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios.get("/api/themes")
            .then(res => {
                setThemes(res.data);
                if (!currentTheme && res.data.length > 0) {
                    setCurrentTheme(res.data[0].slug);
                    setSelectedTheme(res.data[0].slug);
                }
            })
            .catch(() => setThemes([]));
    }, []);

    const handleChangeTheme = () => {
        setLoading(true);
        localStorage.setItem("theme", selectedTheme);
        setCurrentTheme(selectedTheme);
        setMessage(`Tema cambiado a "${themes.find(t => t.slug === selectedTheme)?.name}"`);
        setTimeout(() => window.location.reload(), 1000);
    };

    return (
        <div className="p-5 font-sans">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4">Apariencia</h1>
            <div className="flex-grow w-9/10 bg-white shadow-md sm:p-6">
                <div className="mb-4">
                    <span className="font-semibold">Tema actual: </span>
                    <span>{themes.find(t => t.slug === currentTheme)?.name || "Ninguno"}</span>
                </div>
                <div className="mb-4">
                    <label htmlFor="theme-select" className="block mb-1 font-medium">Selecciona una paleta de colores:</label>
                    <select
                        id="theme-select"
                        className="border px-3 py-2 w-full max-w-xl focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black"
                        value={selectedTheme}
                        onChange={e => setSelectedTheme(e.target.value)}
                    >
                        {themes.map(theme => (
                            <option key={theme.slug} value={theme.slug}>
                                {theme.name} - {theme.description}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    className="dashboard-button-secondary text-white px-4 py-2"
                    onClick={handleChangeTheme}
                    disabled={selectedTheme === currentTheme || loading}
                >
                    {loading ? "Cambiando..." : "Cambiar tema"}
                </button>
                <div className="mt-4 min-h-[24px] dashboard-text">
                    {message}
                </div>
            </div>
            
            <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/settings" className="text-white px-4 py-2 dashboard-button transition-colors">Salir</Link>
            </div>
           
        </div>
    );
};

export default Appearance;
