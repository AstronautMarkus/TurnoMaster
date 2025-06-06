const DashboardPreview = ({ theme }: { theme: string }) => {
    return (
        <div className={`theme-${theme} w-64 h-40 shadow-md overflow-hidden border border-gray-300 bg-gray-100 scale-100 hover:scale-105 transition-transform duration-300 flex flex-col`}>
            <div className="flex flex-1 h-full">
            <div className="w-1/4 dashboard-sidebar flex flex-col items-center py-2 h-full">
                <div className="w-6 h-3 my-1 rounded-sm dashboard-option"></div>
                <div className="w-6 h-3 my-1 rounded-sm dashboard-option"></div>
                <div className="w-6 h-3 my-1 rounded-sm dashboard-option"></div>
            </div>
            <div className="flex-1 flex flex-col h-full">
                <div className="dashboard-background w-full h-6" />
                <div className="flex-1 flex justify-center items-center">
                    <span className="text-xs text-gray-500">Aquí empieza tu experiencia.</span>
                </div>
            </div>
            </div>
        </div>
    );
};
export default DashboardPreview;
