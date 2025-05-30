import { useState, useEffect } from "react";
import axios from "axios";

function useCompanySettings() {
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [companyData, setCompanyData] = useState<any>(null);
    const [employeesData, setEmployeesData] = useState<any>(null);
    const [companyForm, setCompanyForm] = useState<any>({});
    const [editingCompany, setEditingCompany] = useState(false);
    const [updatingCompany, setUpdatingCompany] = useState(false);
    const [companyUpdateMessage, setCompanyUpdateMessage] = useState<string | null>(null);

    useEffect(() => {
        axios.get("/api/company", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => {
            setCompanyId(res.data.company?.id ?? null);
            setProfilePhotoUrl(res.data.company?.profile_photo ?? null);
            setCompanyData(res.data.company);
            setEmployeesData(res.data.employees);
            setCompanyForm(res.data.company || {});
        })
        .catch(() => {
            setCompanyId(null);
            setProfilePhotoUrl(null);
            setCompanyData(null);
            setEmployeesData(null);
            setCompanyForm({});
        });
    }, []);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const handleUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedFile) return;
        setLoading(true);
        setMessage(null);
        const formData = new FormData();
        formData.append("company_image", selectedFile);
        try {
            await axios.post("/api/company/profile-image", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setMessage("Imagen actualizada correctamente.");
            // Refresh image
            const res = await axios.get("/api/company", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setProfilePhotoUrl(res.data.company?.profile_photo ?? null);
            setSelectedFile(null);
        } catch (err: any) {
            setMessage("Error al actualizar la imagen.");
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        if (!profilePhotoUrl) return;
        setLoading(true);
        setMessage(null);
        try {
            await axios.delete("/api/company/profile-image", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setProfilePhotoUrl(null);
            setMessage("Imagen eliminada correctamente.");
        } catch (err: any) {
            setMessage("Error al eliminar la imagen.");
        }
        setLoading(false);
    };

    const handleCompanyUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdatingCompany(true);
        setCompanyUpdateMessage(null);
        try {
            const response = await axios.put("/api/company", {
                name: companyForm.name
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setCompanyUpdateMessage(response.data?.message || "Datos actualizados correctamente.");
            setEditingCompany(false);
            const res = await axios.get("/api/company", {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            setCompanyData(res.data.company);
            setEmployeesData(res.data.employees);
            setCompanyForm(res.data.company || {});
        } catch (err: any) {
            setCompanyUpdateMessage("Error al actualizar los datos.");
        }
        setUpdatingCompany(false);
    };

    return {
        companyId,
        profilePhotoUrl,
        selectedFile,
        loading,
        message,
        handleFileChange,
        handleUpload,
        handleDelete,
        companyData,
        employeesData,
        companyForm,
        setCompanyForm,
        editingCompany,
        setEditingCompany,
        handleCompanyUpdate,
        updatingCompany,
        companyUpdateMessage
    };
}

export default useCompanySettings;
