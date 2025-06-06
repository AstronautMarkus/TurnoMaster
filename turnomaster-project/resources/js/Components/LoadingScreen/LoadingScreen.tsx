interface LoadingScreenProps {
    type?: "auth-login" | "auth-register";
    theme?: "dashboard";
}

const LoadingScreen = ({ type, theme }: LoadingScreenProps) => {
    let message = "Cargando...";
    if (type === "auth-login") {
        message = "Iniciando sesión...";
    } else if (type === "auth-register") {
        message = "Registrando usuario...";
    }

    const dotClass =
        theme === "dashboard"
            ? "dashboard-background"
            : "bg-reyes";
    const textClass =
        theme === "dashboard"
            ? "dashboard-text"
            : "text-reyes";

    return (
        <div className="flex items-center justify-center my-4">
            <div className="flex flex-col items-center justify-center">
                <span className="flex items-center justify-center mb-3">
                    <span className={`dot-animate rounded-full w-2 h-2 mx-1 inline-block ${dotClass}`}></span>
                    <span className={`dot-animate rounded-full w-2 h-2 mx-1 inline-block ${dotClass}`} style={{ animationDelay: "0.2s" }}></span>
                    <span className={`dot-animate rounded-full w-2 h-2 mx-1 inline-block ${dotClass}`} style={{ animationDelay: "0.4s" }}></span>
                    <style>
                        {`
                            .dot-animate {
                                opacity: 0.3;
                                animation: dotBlink 1s infinite;
                            }
                            @keyframes dotBlink {
                                0%, 80%, 100% { opacity: 0.3; }
                                40% { opacity: 1; }
                            }
                        `}
                    </style>
                </span>
                <span className={`font-semibold ${textClass}`}>{message}</span>
            </div>
        </div>
    );
};

export default LoadingScreen;