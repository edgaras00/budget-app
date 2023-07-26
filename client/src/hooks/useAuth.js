import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);
  return;
};

export default useAuth;
