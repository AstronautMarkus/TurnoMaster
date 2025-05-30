import { useState, useEffect } from "react";
import axios from "axios";

function useCompanySettings() {
    const [companyId, setCompanyId] = useState<string | null>(null);
    const [profilePhotoUrl, setProfilePhotoUrl] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        axios.get("/api/company", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => {
            setCompanyId(res.data.company?.id ?? null);
            setProfilePhotoUrl(res.data.company?.profile_photo ?? null);
        })
        .catch(() => {
            setCompanyId(null);
            setProfilePhotoUrl(null);
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

    return {
        companyId,
        profilePhotoUrl,
        selectedFile,
        loading,
        message,
        handleFileChange,
        handleUpload,
        handleDelete,
    };
}

export default useCompanySettings;
