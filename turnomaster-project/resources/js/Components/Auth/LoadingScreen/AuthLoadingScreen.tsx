import React from 'react';

const AuthLoadingScreen: React.FC = () => {
    return (
        <div className="flex items-center justify-center my-4">
            <div className="animate-spin rounded-full w-16 h-16 border-4 border-t-[#891818] border-gray-300"></div>
        </div>
    );
};

export default AuthLoadingScreen;