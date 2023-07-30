import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const validateToken = async (token) => {
      try {
        const response = await fetch("/api/user/validate", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (!token) {
      navigate("/login");
    }

    validateToken(token);
  }, [navigate, token]);
  return;
};

export default useAuth;
