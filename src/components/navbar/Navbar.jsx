import { Person, Menu } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Sidebar } from "../";
import "./navbar.css";

export const Navbar = () => {
  return (
    <>
      <header className="nav--container">
        <div className="logo">
          <Link to="/">FinFlix</Link>
        </div>
        <Link to="/profile" className="nav--item">
          <Person className="icon" />
          <span>Profile</span>
        </Link>
      </header>
      <Sidebar />
    </>
  );
};
