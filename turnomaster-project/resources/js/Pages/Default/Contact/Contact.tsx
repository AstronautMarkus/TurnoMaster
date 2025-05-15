import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "./Modal/Modal";
import HelmetHelper from "../../../hooks/HelmetHelper/HelmetHelper";

const Contact = () => {
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
    const [loadingCategories, setLoadingCategories] = useState(true);
    const [submitting, setSubmitting] = useState(false);
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
    const [categoriesError, setCategoriesError] = useState<string | null>(null);

    useEffect(() => {
        axios.get("/api/contact-form-categories")
            .then(response => {
                setCategories(response.data);
                setLoadingCategories(false);
            })
            .catch(error => {
                setCategoriesError("Error al obtener las categorías. Intenta recargar la página.");
                setLoadingCategories(false);
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
        setSubmitting(true);
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
                setSubmitting(false);
            })
            .catch(error => {
                if (error.response && error.response.status === 422) {
                    setErrors(error.response.data.errors);
                } else {
                    setModal({ isOpen: true, message: "Error al enviar el mensaje. Inténtalo de nuevo más tarde.", isError: true });
                }
                setSubmitting(false);
            });
    };

    const isFormDisabled = loadingCategories || submitting || !!categoriesError;

    return (
        <>
            <HelmetHelper path="/contact"/>
            <Modal isOpen={modal.isOpen} message={modal.message} isError={modal.isError} onClose={() => setModal({ isOpen: false, message: "", isError: false })}/>
            <div className="relative container mx-auto max-w-7xl px-4 md:px-6 flex flex-col items-center gap-6">
                <section className="relative w-full py-12 flex flex-col items-center">
                    <div className="flex flex-row items-start mb-2 w-full justify-center">
                        <div className="bg-[#e01d1d] mr-4 self-stretch w-2"></div>
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-left">
                                Contáctanos
                            </h2>
                            <p className="text-lg text-gray-700 text-left max-w-2xl mt-2">
                                Si tienes preguntas o necesitas asistencia, no dudes en ponerte en contacto con nosotros a través del siguiente formulario. Estamos aquí para ayudarte.
                            </p>
                        </div>
                    </div>
                </section>
                <form
                    onSubmit={handleSubmit}
                    className={`shadow-md mb-8 p-6 space-y-6 w-full max-w-5xl border-2 border-gray-300 ${isFormDisabled ? "opacity-60 pointer-events-none bg-gray-100" : ""}`}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold mb-1">Nombre *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border shadow-sm focus:ring focus:ring-[#e01d1d]"
                                disabled={isFormDisabled}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Apellido *</label>
                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border shadow-sm focus:ring focus:ring-[#e01d1d]"
                                disabled={isFormDisabled}
                            />
                            {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Correo electrónico *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border shadow-sm focus:ring focus:ring-[#e01d1d]"
                                disabled={isFormDisabled}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Teléfono *</label>
                            <input
                                type="text"
                                name="cellphone"
                                value={formData.cellphone}
                                onChange={handleChange}
                                className={`w-full px-3 py-2 border shadow-sm focus:ring focus:ring-[#e01d1d] ${
                                    errors.cellphone ? "border-red-500" : ""
                                }`}
                                disabled={isFormDisabled}
                            />
                            {errors.cellphone && <p className="text-red-500 text-sm mt-1">{errors.cellphone}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Empresa (opcional)</label>
                            <input
                                type="text"
                                name="company"
                                value={formData.company}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border shadow-sm focus:ring focus:ring-[#e01d1d]"
                                disabled={isFormDisabled}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Categoría del mensaje *</label>
                            <select
                                name="message_category_id"
                                value={formData.message_category_id}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border shadow-sm focus:ring focus:ring-[#e01d1d]"
                                disabled={isFormDisabled}
                            >
                                <option value="">Selecciona una categoría</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.name}</option>
                                ))}
                            </select>
                            {errors.message_category_id && <p className="text-red-500 text-sm mt-1">{errors.message_category_id}</p>}
                        </div>
                    </div>
                    
                    {categoriesError && (
                        <div className="w-full max-w-5xl mb-4 p-4 bg-red-100 text-red-700 border border-red-300">
                            {categoriesError}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-bold mb-1">Mensaje *</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full px-3 py-4 border shadow-sm focus:ring focus:ring-[#e01d1d] text-base"
                            rows={6}
                            disabled={isFormDisabled}
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            name="terms_accepted"
                            checked={formData.terms_accepted}
                            onChange={handleChange}
                            className="mr-2 accent-[#e01d1d]"
                            disabled={isFormDisabled}
                        />
                        <label className="text-sm text-gray-700">
                            Acepto los <Link to="/terms-and-conditions" target="_blank" className="text-[#e01d1d] underline">términos y condiciones</Link>
                        </label>
                        {errors.terms_accepted && <p className="text-red-500 text-sm mt-1 mx-2">{errors.terms_accepted}</p>}
                    </div>
                    <div style={{ display: "none" }}>
                        <label>Honeypot:</label>
                        <input type="text" name="honeypot" value={formData.honeypot} onChange={handleChange} disabled={isFormDisabled} />
                    </div>
                    <div className="text-center">
                        <button
                            type="submit"
                            className="inline-flex h-10 items-center justify-center bg-[#e01d1d] hover:bg-[#b21e1e] px-6 py-2 font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 text-base"
                            disabled={isFormDisabled}
                        >
                            {loadingCategories
                                ? "Obteniendo categorías..."
                                : submitting
                                    ? "Enviando..."
                                    : "Enviar mensaje"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Contact;
