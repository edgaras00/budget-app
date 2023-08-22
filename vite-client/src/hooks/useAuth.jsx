import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const useAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const validateToken = async (token) => {
      try {
        let url = "https://nextbudget-server.onrender.com/api/user/validate";
        if (process.env.REACT_APP_ENV === "development") {
          url = "/api/user/validate";
        }

        const response = await fetch(url, {
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
