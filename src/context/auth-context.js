import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const getInitialData = () => {
  const userLocalData = JSON.parse(localStorage.getItem("finFlixUser"));
  if (userLocalData !== null) {
    return { isLoggedIn: true, userData: userLocalData };
  } else {
    return { isLoggedIn: false, userData: {} };
  }
};
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [authData, setAuthData] = useState(getInitialData());

  const handleLogin = (userMail, password) => {
    (async () => {
      try {
        const { status, data } = await axios.post("/auth/login", {
          username: userMail,
          password: password,
        });
        if (status === 200 || status === 201) {
          localStorage.setItem("finFlixToken", data.token);
          localStorage.setItem("finFlixUser", JSON.stringify(data.user));
          setAuthData((prev) => ({
            ...prev,
            isLoggedIn: true,
            userData: data.user,
          }));

          navigate(from, { replace: true });
          setAuthData((prev) => ({ ...prev, isLoggedIn: true }));
          toast.success(
            `Welcome Back ${data.user.first_name} ${data.user.last_name}`
          );
        }
      } catch (e) {
        setAuthData((prev) => ({ ...prev, isLoggedIn: false }));
        console.error("Error in Login", e);
        toast.error("Something Went Wrong. Try again");
      }
    })();
  };
  const handleSignUp = (firstName, lastName, userMail, password) => {
    (async () => {
      try {
        const { status, data } = await axios.post("/auth/signup", {
          first_name: firstName,
          last_name: lastName,
          username: userMail,
          password: password,
        });
        if (status === 201) {
          localStorage.setItem("finFlixToken", data.token);
          localStorage.setItem("finFlixUser", JSON.stringify(data.user));
          setAuthData((prev) => ({
            ...prev,
            isLoggedIn: true,
            userData: data.user,
          }));
          navigate(from, { replace: true });
          toast.success(
            `Let's enhance Your Financial Knowledge ${data.user.first_name} ${data.user.last_name} `
          );
        }
      } catch (e) {
        setAuthData((prev) => ({ ...prev, isLoggedIn: false }));
        console.error("Error in signup", e);
        toast.error("Something Went Wrong. Try again");
      }
    })();
  };
  const handleLogout = () => {
    setAuthData((prev) => ({
      ...prev,
      isLoggedIn: false,
      userData: {},
    }));
    localStorage.removeItem("finFlixToken");
    localStorage.removeItem("finFlixUser");
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{ authData, handleLogin, handleSignUp, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
