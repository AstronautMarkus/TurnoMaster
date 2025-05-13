import axios from "axios";

export const useGetRoles = async () => {
    try {
        const response = await axios.get('/api/roles');

        return response.data.map((role: any) => ({
            id: role.id,
            name: role.name,
        }));
    } catch (error) {
        console.error("Error obteniendo los roles:", error);
        throw error;
    }
};