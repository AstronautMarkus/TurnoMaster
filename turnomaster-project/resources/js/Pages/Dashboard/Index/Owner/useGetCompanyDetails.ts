import { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';

interface CompanyDetails {
    company: {
        name: string;
        email: string | null;
        created_at: string;
        updated_at: string;
        profile_image: string;
    };
    employees: {
        total: number;
        details: {
            admin: number;
            hr: number;
            employee: number;
        };
    };
}

const useGetCompanyDetails = () => {
    const [data, setData] = useState<CompanyDetails | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('api/company', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const formattedData = {
                    ...response.data,
                    company: {
                        ...response.data.company,
                        created_at: format(new Date(response.data.company.created_at), 'dd/MM/yyyy - HH:mm'),
                        updated_at: format(new Date(response.data.company.updated_at), 'dd/MM/yyyy - HH:mm'),
                        profile_image: response.data.company.profile_image || '/img/company/default.png',
                    },
                };

                setData(formattedData);
            } catch (error) {
                console.error('Error fetching company details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, []);

    return { data, loading };
};

export default useGetCompanyDetails;
