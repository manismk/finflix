import { MoreVert } from "@mui/icons-material";
import "./videoCard.css";

export const VideoCard = () => {
  return (
    <div className="card video-card">
      <div className="thumbnail--container">
        <img
          className="img--res"
          src="https://img.youtube.com/vi/tHxwyWnNu0c/mqdefault.jpg"
          alt="thumbnail"
        />
      </div>
      <div className="video--footer--container">
        <img
          src="https://randomuser.me/api/portraits/men/41.jpg"
          alt="Randomuser"
          className="avatar avatar--circle avatar--sm"
        />
        <div className="video--card--content">
          <div className="video--card--title">Random Video</div>
          <div className="video--card--creator">Creator Name</div>
          <div className="video--card--count">200K viwes</div>
        </div>
        <button className="btn icon--btn">
          <MoreVert />
        </button>
      </div>
    </div>
  );
};
