import { MoreVert, PlayArrow } from "@mui/icons-material";
import "./videoCard.css";
import { useNavigate } from "react-router-dom";
import fetchThumbnail from "yt-thumb";
import { useEffect, useState } from "react";

const getAnimatedThumbnailUrl = (videoId) => {
  const result = (async () => {
    let animatedSrc = "";
    try {
      const result = await fetchThumbnail(videoId);
      animatedSrc = result;
    } catch (e) {
      animatedSrc = `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    } finally {
      return animatedSrc;
    }
  })();
  return result;
};

export const VideoCard = ({ videoDetails }) => {
  const navigate = useNavigate();
  const [showAnimatedThumbnail, setAnimatedThumbnail] = useState(false);
  const [animatedUrl, setAnimatedUrl] = useState("");

  useEffect(() => {
    (async () => {
      const animatedUrlResult = await getAnimatedThumbnailUrl(videoDetails._id);
      setAnimatedUrl(animatedUrlResult);
    })();
  }, [videoDetails._id]);

  return (
    <div className="card video-card">
      <div
        className="thumbnail--container"
        onClick={() => navigate(`/videos/${videoDetails._id}`)}
        onMouseEnter={() => setAnimatedThumbnail(true)}
        onMouseLeave={() => setAnimatedThumbnail(false)}
      >
        {showAnimatedThumbnail ? (
          <img
            className="img--res"
            src={animatedUrl}
            alt={videoDetails.title}
          />
        ) : (
          <img
            className="img--res"
            src={`https://img.youtube.com/vi/${videoDetails._id}/mqdefault.jpg`}
            alt={videoDetails.title}
          />
        )}
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
