import {
  ThumbUp,
  Explore,
  Subscriptions,
  History,
  WatchLater,
} from "@mui/icons-material";

import { NavLink } from "react-router-dom";

import "./sidebar.css";
import { routes } from "../../constant.js";

const activeLink = ({ isActive }) => ({
  backgroundColor: isActive ? "var(--primary--color)" : "",
});

export const Sidebar = () => {
  return (
    <>
      <aside className="sidebar">
        <NavLink style={activeLink} to={routes.EXPLORE_PAGE}>
          <div className="sidebar--item">
            <Explore />
            <p className="sidebar--title">Explore</p>
          </div>
        </NavLink>

        <NavLink style={activeLink} to={routes.LIKED_PAGE}>
          <div className="sidebar--item">
            <ThumbUp />
            <p className="sidebar--title">Liked</p>
          </div>
        </NavLink>
        <NavLink style={activeLink} to={routes.PLAYLIST_PAGE}>
          <div className="sidebar--item">
            <Subscriptions />
            <p className="sidebar--title">Playlist</p>
          </div>
        </NavLink>
        <NavLink style={activeLink} to={routes.WATCH_LATER_PAGE}>
          <div className="sidebar--item">
            <WatchLater />
            <p className="sidebar--title">Watch Later</p>
          </div>
        </NavLink>
        <NavLink style={activeLink} to={routes.HISTORY_PAGE}>
          <div className="sidebar--item">
            <History />
            <p className="sidebar--title">History</p>
          </div>
        </NavLink>
      </aside>
    </>
  );
};
