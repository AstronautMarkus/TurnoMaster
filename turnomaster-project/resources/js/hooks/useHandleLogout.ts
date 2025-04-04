import { useNavigate } from "react-router-dom";

export function useHandleLogout() {
  const navigate = useNavigate();

  const handleLogout = (onLogout?: () => void) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    if (onLogout) onLogout();
    navigate("/");
  };

  return handleLogout;
}
