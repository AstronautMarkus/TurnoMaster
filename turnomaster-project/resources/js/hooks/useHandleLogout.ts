import { useNavigate } from "react-router-dom";

export function useHandleLogout() {
  const navigate = useNavigate();

  const handleLogout = (onLogout?: () => void) => {
    if (onLogout) onLogout();
    navigate("/auth/logout");
  };

  return handleLogout;
}
