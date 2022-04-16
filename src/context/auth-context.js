import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

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
        const { status, data } = await axios.post("/api/auth/login", {
          email: userMail,
          password: password,
        });
        if (status === 200 || status === 201) {
          localStorage.setItem("finFlixToken", data.encodedToken);
          localStorage.setItem("finFlixUser", JSON.stringify(data.foundUser));
          setAuthData((prev) => ({
            ...prev,
            isLoggedIn: true,
            userData: data.foundUser,
          }));

          navigate(from, { replace: true });
          setAuthData((prev) => ({ ...prev, isLoggedIn: true }));
        }
      } catch (e) {
        setAuthData((prev) => ({ ...prev, isLoggedIn: false }));
        console.log("Error in Login", e);
      }
    })();
  };
  const handleSignUp = (firstName, lastName, userMail, password) => {
    (async () => {
      try {
        const { status, data } = await axios.post("/api/auth/signup", {
          firstName: firstName,
          lastName: lastName,
          email: userMail,
          password: password,
        });
        if (status === 201) {
          localStorage.setItem("finFlixToken", data.encodedToken);
          localStorage.setItem("finFlixUser", JSON.stringify(data.createdUser));
          setAuthData((prev) => ({
            ...prev,
            isLoggedIn: true,
            userData: data.createdUser,
          }));
          navigate(from, { replace: true });
        }
      } catch (e) {
        setAuthData((prev) => ({ ...prev, isLoggedIn: false }));
        console.log("Error in signup", e);
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
