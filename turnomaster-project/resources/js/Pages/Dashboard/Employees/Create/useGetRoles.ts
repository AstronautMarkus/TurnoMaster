import axios from "axios";

export const useGetRoles = async () => {
    try {
        const token = localStorage.getItem("token");
        const response = await axios.get('/api/roles', {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data.map((role: any) => ({
            id: role.id,
            name: role.name,
        }));
    } catch (error) {
        console.error("Error obteniendo los roles:", error);
        throw error;
    }
};