import { Person, Login } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Sidebar } from "../";
import { useAuth } from "../../context";
import "./navbar.css";

export const Navbar = () => {
  const { authData } = useAuth();

  return (
    <>
      <header className="nav--container">
        <div className="logo">
          <Link to="/">FinFlix</Link>
        </div>
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
      </header>
      <Sidebar />
    </>
  );
};
