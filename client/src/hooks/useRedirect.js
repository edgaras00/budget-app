import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  return;
};

export default useAuth;
