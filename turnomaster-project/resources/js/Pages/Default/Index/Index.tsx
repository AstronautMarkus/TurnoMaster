import React from 'react';

const IndexPage: React.FC = () => {
    return (
        <div className="flex flex-col w-full h-full">
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