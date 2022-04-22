import { Delete, MoreVert, PlayArrow } from "@mui/icons-material";
import "./videoCard.css";
import { useNavigate } from "react-router-dom";
import { useHistory } from "../../context/";
import { VideoCardMenu } from "../";
import { useState } from "react";

export const VideoCard = ({
  videoDetails,
  showDelete,
  deleteCallBack,
  from,
}) => {
  const navigate = useNavigate();
  const { addToHistory } = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="card video-card" onMouseLeave={() => setShowMenu(false)}>
      <div
        className="thumbnail--container"
        onClick={() => {
          navigate(`/videos/${videoDetails._id}`);
          addToHistory(videoDetails);
        }}
      >
        <img
          className="img--res"
          src={`https://img.youtube.com/vi/${videoDetails._id}/mqdefault.jpg`}
          alt={videoDetails.title}
        />

        <div className="play--button">
          <PlayArrow />
        </div>
        <span className="video--duration">{videoDetails.duration}</span>
      </div>
      <div className="video--footer--container">
        <img
          src={`${videoDetails.creatorImgUrl}`}
          className="avatar avatar--circle avatar--xs"
        />
        <div className="video--card--content">
          <div className="video--card--title">{videoDetails.title}</div>
          <div className="video--card--creator">{videoDetails.creator}</div>
          <div className="video--card--count">200K viwes</div>
        </div>
        {showDelete ? (
          <button
            className="btn icon--btn"
            title={`Delete ${from}`}
            onClick={deleteCallBack}
          >
            <Delete />
          </button>
        ) : (
          <button
            className="btn icon--btn"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <MoreVert />
          </button>
        )}
      </div>
      {showMenu && <VideoCardMenu />}
    </div>
  );
};
