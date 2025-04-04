import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal/Modal";
import AuthLoadingScreen from "../../../Components/Auth/LoadingScreen/AuthLoadingScreen";

const Contact: React.FC = () => {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        name: "",
        last_name: "",
        email: "",
        cellphone: "",
        company: "",
        message_category_id: "",
        message: "",
        terms_accepted: false,
        honeypot: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [modal, setModal] = useState({ isOpen: false, message: "", isError: false });

    useEffect(() => {
        axios.get("/api/contact-form-categories")
            .then(response => {
                setCategories(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
        const checked = type === "checkbox" && (e.target as HTMLInputElement).checked;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
        setErrors({ ...errors, [name]: "" });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        axios.post("/api/contact-form", formData)
            .then(() => {
                setModal({ isOpen: true, message: "Mensaje enviado correctamente. Pronto nos pondremos en contacto.", isError: false });
                setFormData({
                    name: "",
                    last_name: "",
                    email: "",
                    cellphone: "",
                    company: "",
                    message_category_id: "",
                    message: "",
                    terms_accepted: false,
                    honeypot: "",
                });
                setErrors({});
                setLoading(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors);
                } else {
                    setModal({ isOpen: true, message: "Error al enviar el mensaje. Inténtalo de nuevo más tarde.", isError: true });
                }
                setLoading(false);
            });
    };

    return (
        <>
            <Modal
                isOpen={modal.isOpen}
                message={modal.message}
                isError={modal.isError}
                onClose={() => setModal({ isOpen: false, message: "", isError: false })}
            />
            <div className="max-w-3xl mx-auto py-10 px-6">
                {loading ? (
                    <AuthLoadingScreen />
                ) : (
                    <>
                        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Contáctanos</h2>
                        <p className="text-center text-gray-600 mb-6">
                            Si tienes alguna pregunta o necesitas más información, no dudes en enviarnos un mensaje. Estamos aquí para ayudarte.
                        </p>
                        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-xl p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                                    <input type="text" name="name" value={formData.name} onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-[#5C5AD6]" required />
                                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                                    <input type="text" name="last_name" value={formData.last_name} onChange={handleChange}
                                        className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-[#5C5AD6]" required />
                                    {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
                                <input type="email" name="email" value={formData.email} onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-[#5C5AD6]" required />
                                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
                                <input
                                    type="text"
                                    name="cellphone"
                                    value={formData.cellphone}
                                    onChange={handleChange}
                                    className={`w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-[#5C5AD6] ${
                                        errors.cellphone ? "border-red-500" : ""
                                    }`}
                                    required
                                />
                                {errors.cellphone && <p className="text-red-500 text-sm mt-1">{errors.cellphone}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Empresa (opcional)</label>
                                <input type="text" name="company" value={formData.company} onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-[#5C5AD6]" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Categoría del mensaje</label>
                                <select name="message_category_id" value={formData.message_category_id} onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-[#5C5AD6]" required>
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>{category.name}</option>
                                    ))}
                                </select>
                                {errors.message_category_id && <p className="text-red-500 text-sm mt-1">{errors.message_category_id}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                                <textarea name="message" value={formData.message} onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-lg shadow-sm focus:ring focus:ring-[#5C5AD6]" rows={4} required />
                                {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" name="terms_accepted" checked={formData.terms_accepted} onChange={handleChange}
                                    className="mr-2" required />
                                <label className="text-sm text-gray-700">
                                    Acepto los <Link to="/terms-and-conditions" target="_blank" className="text-[#5C5AD6] underline">términos y condiciones</Link>
                                </label>
                                {errors.terms_accepted && <p className="text-red-500 text-sm mt-1">{errors.terms_accepted}</p>}
                            </div>
                            <div style={{ display: "none" }}>
                                <label>Honeypot:</label>
                                <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} />
                            </div>
                            <div className="text-center">
                                <button
                                    type="submit"
                                    className={`px-6 py-2 rounded-full transition ${
                                        loading ? "bg-gray-400 cursor-not-allowed" : "bg-[#5C5AD6] text-white hover:bg-[#5C5AD6]"
                                    }`}
                                    disabled={loading}
                                >
                                    {loading ? "Enviando..." : "Enviar mensaje"}
                                </button>
                            </div>
                        </form>
                    </>
                )}
            </div>
        </>
    );
};

export default Contact;
