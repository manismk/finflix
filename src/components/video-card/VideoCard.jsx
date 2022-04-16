import { MoreVert, PlayArrow } from "@mui/icons-material";
import "./videoCard.css";

export const VideoCard = ({ videoDetails }) => {
  return (
    <div className="card video-card">
      <div className="thumbnail--container">
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
        <button className="btn icon--btn">
          <MoreVert />
        </button>
      </div>
    </div>
  );
};
