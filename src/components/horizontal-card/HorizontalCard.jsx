import { PlayArrow } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./horizontalCard.css";

export const HorizontalCard = ({ video }) => {
  const navigate = useNavigate();
  return (
    <div className="horizontal--card">
      <div
        className="thumbnail--container"
        onClick={() => navigate(`/videos/${video._id}`)}
      >
        <img
          className="img--res"
          src={`https://img.youtube.com/vi/${video._id}/mqdefault.jpg`}
        />
        <div className="play--button">
          <PlayArrow />
        </div>
      </div>
      <div className="horizontal--content">
        <div className="video--title">{video.title}</div>
        <div className="video--creator">{video.creator}</div>
        <div className="video--count">200K views</div>
      </div>
    </div>
  );
};
