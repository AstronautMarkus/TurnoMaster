import { Link } from "react-router-dom";
import useCompanySettings from "./useCompanySettings";

function CompanySettings() {
    const {
        profilePhotoUrl,
        selectedFile,
        loading,
        message,
        handleFileChange,
        handleUpload,
        handleDelete,
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

            <div className="flex space-x-2 justify-end mt-4">
                <Link to="/dashboard/settings" className="text-white px-4 py-2 dashboard-button transition-colors">Salir</Link>
            </div>
        </div>
    );
}

export default CompanySettings;