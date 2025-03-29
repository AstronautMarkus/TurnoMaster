import React from 'react';

const IndexPage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h1 className="text-2xl font-bold text-gray-800">Welcome to TurnoMaster</h1>
                <p className="mt-4 text-gray-600">
                    This is a basic React page styled with Tailwind CSS.
                </p>
                <button className="px-4 py-2 mt-6 text-white bg-blue-500 rounded hover:bg-blue-600">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default IndexPage;