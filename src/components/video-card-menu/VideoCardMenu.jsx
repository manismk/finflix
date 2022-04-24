import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { videoContextConstant } from "../../constant";
import { useAuth, useVideos, useWatchLater } from "../../context";

export const VideoCardMenu = ({ video }) => {
  const { authData } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { videoDispatch } = useVideos();
  const {
    watchLater,
    addToWatchLater,
    watchLaterLoading,
    removeFromWatchLater,
  } = useWatchLater();
  const [isWatchLater, setIsWatchLater] = useState(false);

  useEffect(() => {
    watchLater.find((watchLaterVideo) => watchLaterVideo._id === video._id)
      ? setIsWatchLater(true)
      : setIsWatchLater(false);
  }, [watchLater]);
  return (
    <div className="video--card--menu">
      {!isWatchLater ? (
        <button
          disabled={watchLaterLoading}
          className={`btn w-100 ${watchLaterLoading ? "btn--disabled" : ""}`}
          onClick={() =>
            authData.isLoggedIn
              ? addToWatchLater(video)
              : navigate("/login", {
                  state: { from: location },
                  replace: true,
                })
          }
        >
          Add to Watch Later
        </button>
      ) : (
        <button
          disabled={watchLaterLoading}
          className={`btn w-100 ${watchLaterLoading ? "btn--disabled" : ""}`}
          onClick={() => removeFromWatchLater(video._id)}
        >
          Remove from Watch Later
        </button>
      )}
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
