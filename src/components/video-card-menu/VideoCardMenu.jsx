import { useLocation, useNavigate } from "react-router-dom";
import { videoContextConstant } from "../../constant";
import { useAuth, useVideos } from "../../context";

export const VideoCardMenu = ({ video }) => {
  const { authData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { videoDispatch } = useVideos();
  return (
    <div className="video--card--menu">
      <button className="btn w-100">Add to Watch Later</button>
      <button
        className="btn w-100"
        onClick={() =>
          authData.isLoggedIn
            ? videoDispatch({
                type: videoContextConstant.SHOW_PLAYLIST_MODAL,
                payload: { video },
              })
            : navigate("/login", {
                state: { from: location },
                replace: true,
              })
        }
      >
        Add to Playlist
      </button>
    </div>
  );
};
