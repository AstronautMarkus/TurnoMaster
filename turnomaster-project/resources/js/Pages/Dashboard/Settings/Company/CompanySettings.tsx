import { Link } from "react-router-dom";
import useCompanySettings from "./useCompanySettings";
import { useState } from "react";

function CompanySettings() {
    const {
        profilePhotoUrl,
        selectedFile,
        loading,
        message,
        handleFileChange,
        handleUpload,
        handleDelete,
        companyData,
        employeesData,
        handleCompanyUpdate,
        updatingCompany,
        companyForm,
        setCompanyForm,
        editingCompany,
        setEditingCompany,
        companyUpdateMessage
    } = useCompanySettings();

    return (
        <div className="p-5 font-sans">
            <h1 className="text-3xl sm:text-4xl font-bold text-left mb-6 mt-4">Configurar Empresa</h1>

            <div className="bg-white shadow-md sm:p-6 mb-8">
                <h2 className="text-2xl font-bold mb-6">Imagen de la empresa</h2>
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="flex-1 md:max-w-xs">
                        <h3 className="text-lg font-semibold mb-2">Actualizar imagen</h3>
                        {(profilePhotoUrl && profilePhotoUrl !== "null" && profilePhotoUrl !== "") ? (
                            <div className="mb-2">
                                <img src={profilePhotoUrl} alt="Foto de la empresa" className="w-32 h-32 object-cover rounded" />
                            </div>
                        ) : (
                            <div className="mb-4 dashboard-text mt-4">No hay imagen asignada</div>
                        )}
                        <form onSubmit={handleUpload} className="flex flex-col space-y-2">
                            <input type="file" accept="image/*" onChange={handleFileChange} />
                            <button
                                type="submit"
                                disabled={loading || !selectedFile}
                                className="dashboard-button text-white px-4 py-2 disabled:opacity-50 w-full"
                            >
                                {loading ? "Subiendo..." : "Actualizar Imagen"}
                            </button>
                        </form>
                        <button
                            onClick={handleDelete}
                            disabled={loading || !(profilePhotoUrl && profilePhotoUrl !== "null" && profilePhotoUrl !== "")}
                            className="mt-2 dashboard-button-secondary text-white px-4 py-2 disabled:opacity-50 w-full"
                        >
                            {loading ? "Eliminando..." : "Eliminar Imagen"}
                        </button>
                        <div className="mt-4 min-h-[24px] dashboard-text">
                            {message}
                        </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                        <h3 className="text-lg font-semibold mb-2">Previsualización</h3>
                        <div className="mt-0 flex flex-col justify-center items-center w-full mb-4">
                            {(profilePhotoUrl && profilePhotoUrl !== "null" && profilePhotoUrl !== "") ? (
                                <>
                                    <img src={profilePhotoUrl} alt="Previsualización" className="w-60 h-60 object-cover rounded shadow" />
                                    <div className="mt-4 mb-4 text-sm text-gray-500 italic">Luce muy bien...</div>
                                </>
                            ) : (
                                <div className="w-60 h-60 flex items-center justify-center bg-gray-100 text-gray-400 rounded shadow">
                                    Sin imagen
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            
            <div className="shadow-md mb-8 p-6 w-full bg-white ">
                <h2 className="text-2xl font-bold mb-6">Datos de la empresa</h2>
                <form
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    onSubmit={e => {
                        e.preventDefault();
                        handleCompanyUpdate(e);
                    }}
                >
                    <div className="flex flex-col">
                        <label className="block text-sm font-bold mb-1">Nombre *</label>
                        <input
                            type="text"
                            className={`w-full px-3 py-2 border focus:outline-none focus:ring-3 focus:ring-black focus:border-black hover:border-black ${editingCompany ? "" : "bg-gray-100"}`}
                            value={companyForm.name || ""}
                            disabled={!editingCompany}
                            onChange={e => setCompanyForm((f: typeof companyForm) => ({ ...f, name: e.target.value }))}
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-sm font-bold mb-1">Correo electrónico</label>
                        <input
                            type="email"
                            className="w-full px-3 py-2 border bg-gray-100"
                            value={companyForm.email || ""}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-sm font-bold mb-1">Creado</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border bg-gray-100"
                            value={companyForm.created_at ? new Date(companyForm.created_at).toLocaleString() : ""}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col">
                        <label className="block text-sm font-bold mb-1">Actualizado</label>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border bg-gray-100"
                            value={companyForm.updated_at ? new Date(companyForm.updated_at).toLocaleString() : ""}
                            disabled
                        />
                    </div>
                    <div className="flex gap-2 md:col-span-2 mt-2 items-center">
                        {!editingCompany ? (
                            <button
                                type="button"
                                className="inline-flex h-10 items-center justify-center bg-black hover:bg-gray-800 px-6 py-2 font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-base"
                                onClick={() => setEditingCompany(true)}
                            >
                                Cambiar nombre
                            </button>
                        ) : (
                            <>
                                <button
                                    type="submit"
                                    className="inline-flex h-10 items-center justify-center bg-black hover:bg-gray-800 px-6 py-2 font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 text-base"
                                    disabled={updatingCompany}
                                >
                                    {updatingCompany ? "Guardando..." : "Guardar"}
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex h-10 items-center justify-center bg-gray-500 hover:bg-gray-700 px-6 py-2 font-semibold text-white transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 text-base"
                                    onClick={() => {
                                        setEditingCompany(false);
                                        setCompanyForm(companyData || {});
                                    }}
                                    disabled={updatingCompany}
                                >
                                    Cancelar
                                </button>
                            </>
                        )}
                        <div className="ml-4 dashboard-text min-h-[24px]">{companyUpdateMessage}</div>
                    </div>
                </form>
            </div>

            <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/settings" className="text-white px-4 py-2 dashboard-button transition-colors">Salir</Link>
            </div>
        </div>
    );
}

export default CompanySettings;