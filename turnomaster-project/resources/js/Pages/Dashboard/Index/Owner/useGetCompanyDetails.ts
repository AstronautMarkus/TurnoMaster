import { useState, useEffect } from 'react';
import axios from 'axios';

interface CompanyDetails {
    company: {
        name: string;
        email: string | null;
        created_at: string;
        updated_at: string;
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
                setData(response.data);
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
