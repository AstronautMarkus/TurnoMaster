import React from 'react';

const AuthLoadingScreen: React.FC = () => {
    return (
        <div className="flex items-center justify-center my-4">
            <div className="animate-spin rounded-full w-16 border-t-4 border-blue-500"></div>
        </div>
    );
};

export default AuthLoadingScreen;