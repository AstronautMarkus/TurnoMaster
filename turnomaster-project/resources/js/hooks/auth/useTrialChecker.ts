import { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

interface DecodedToken {
    is_trial: boolean;
    [key: string]: any;
}

const useTrialChecker = (): boolean | null => {
    const [isTrial, setIsTrial] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded: DecodedToken = jwtDecode(token);
                if (decoded.is_trial) {
                    setIsTrial(decoded.is_trial);
                }
                else if (decoded.is_trial === false) {
                    setIsTrial(false);
                }
                else {
                    console.warn('is_trial not found in token');
                }
            } catch (error) {
                console.error('Invalid token', error);
            }
        }
    }, []);

    return isTrial;
};

export default useTrialChecker;