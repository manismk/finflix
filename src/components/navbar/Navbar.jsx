import { Person, Login, LightMode, DarkMode } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Sidebar } from "../";
import { useAuth } from "../../context";
import "./navbar.css";

export const Navbar = ({ theme, changeHandler }) => {
  const { authData } = useAuth();

  return (
    <>
      <header className="nav--container">
        <div className="logo">
          <Link to="/">FinFlix</Link>
        </div>
        <div className="navbar--action--container">
          <button
            className="btn icon--btn nav--item"
            onClick={() => {
              localStorage.setItem(
                "finFlixTheme",
                theme === "dark" ? "light" : "dark"
              );
              changeHandler();
            }}
          >
            {theme === "dark" ? <LightMode /> : <DarkMode />}
            <span>{theme === "dark" ? "Light" : "Dark"} Mode</span>
          </button>
          {authData.isLoggedIn ? (
            <Link to="/profile" className="nav--item">
              <Person />
              <span>Profile</span>
            </Link>
          ) : (
            <Link to="/login" className="nav--item">
              <Login />
              <span>Login</span>
            </Link>
          )}
        </div>
      </header>
      <Sidebar />
    </>
  );
};
