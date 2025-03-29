import React from 'react';

const IndexPage: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full">
            <div className="flex items-center justify-center w-full h-full bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="text-center text-white">
                    <h1 className="text-4xl font-bold mb-4">Welcome to TurnoMaster</h1>
                    <p className="text-lg mb-6">
                        Manage your schedules effortlessly with our intuitive platform.
                    </p>
                    <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow-md hover:bg-gray-100">
                        Get Started
                    </button>
                </div>
            </div>
            <div className="py-12 bg-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Why Choose TurnoMaster?</h2>
                    <p className="text-gray-600 mb-6">
                        TurnoMaster offers a seamless experience for managing your schedules, ensuring you stay organized and productive.
                    </p>
                    <ul className="list-disc list-inside text-gray-600">
                        <li>Easy-to-use interface</li>
                        <li>Customizable scheduling options</li>
                        <li>Real-time notifications</li>
                        <li>Secure and reliable platform</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default IndexPage;