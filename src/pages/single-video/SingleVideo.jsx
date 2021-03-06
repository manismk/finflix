import {
  KeyboardBackspace,
  ThumbUpOutlined,
  WatchLaterOutlined,
  PlaylistAdd,
  ThumbUp,
  WatchLater,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { HorizontalCard, Loader, PlaylistModal } from "../../components";
import { videoContextConstant } from "../../constant";
import { useAuth, useLikes, useVideos, useWatchLater } from "../../context";
import {
  getSingleVideo,
  getRecommendedVideos,
  getCreatorVideos,
} from "../../utils/";

import "./singleVideo.css";

const handleBackClick = (navigate) => {
  if (window.history.state && window.history.state.idx > 0) {
    navigate(-1);
  } else {
    navigate("/", { replace: true });
  }
};

export const SingleVideo = () => {
  const params = useParams();
  const { videoState, videoDispatch } = useVideos();
  const { likedVideos, likeVideo, removeLike, likeLoading } = useLikes();
  const {
    addToWatchLater,
    watchLater,
    removeFromWatchLater,
    watchLaterLoading,
  } = useWatchLater();
  const { authData } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [data, setData] = useState({
    video: {},
    isLoading: false,
    recommendedVideos: [],
    creatorVideos: [],
    isLiked: false,
    isWatchLater: false,
  });
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      recommendedVideos: getRecommendedVideos(
        videoState.allVideos,
        params.videoId
      ),
      creatorVideos: getCreatorVideos(videoState.allVideos, params.videoId),
    }));
  }, [videoState.allVideos, params.videoId]);

  useEffect(() => {
    setData((prev) => ({ ...prev, isLoading: true }));
    (async () => {
      const video = await getSingleVideo(params.videoId);
      setData((prev) => ({ ...prev, video, isLoading: false }));
    })();
  }, [params]);

  useEffect(() => {
    likedVideos.find((likedVideo) => likedVideo._id === params.videoId)
      ? setData((prev) => ({ ...prev, isLiked: true }))
      : setData((prev) => ({ ...prev, isLiked: false }));
  }, [likedVideos, params]);

  useEffect(() => {
    watchLater.find((watchLaterVideo) => watchLaterVideo._id === params.videoId)
      ? setData((prev) => ({ ...prev, isWatchLater: true }))
      : setData((prev) => ({ ...prev, isWatchLater: false }));
  }, [watchLater, params]);

  return (
    <div className="grid--70--30 m-v-2">
      {data.isLoading && <Loader />}
      {data.video !== null ? (
        <>
          <div>
            <button
              className="btn btn--fab"
              onClick={() => handleBackClick(navigate)}
            >
              <KeyboardBackspace />
            </button>
            <div className="video--container m-t-1">
              <embed
                className="embed--video "
                src={`https://www.youtube.com/embed/${data.video?._id}`}
              ></embed>
              <h2 className="video--title m-t-1 m-l-1">{data.video?.title}</h2>
              <div className="video--action--container">
                <div className="video--content--container ">
                  <img
                    src={data.video?.creatorImgUrl}
                    className="avatar avatar--circle avatar--xs"
                  />
                  <div className="video--content">
                    <div className="video--creator">{data.video?.creator}</div>
                    <div className="video--count">200K views</div>
                  </div>
                </div>
                <div className="action--controls">
                  {data.isLiked ? (
                    <button
                      className={`btn icon--btn  video--action active ${
                        likeLoading ? "btn--disabled" : ""
                      }`}
                      onClick={() => removeLike(data.video._id)}
                      disabled={likeLoading}
                    >
                      <ThumbUp />
                      <p className="action--title">Liked</p>
                    </button>
                  ) : (
                    <button
                      className={`btn icon--btn  video--action ${
                        likeLoading ? "btn--disabled" : ""
                      }`}
                      onClick={() =>
                        authData.isLoggedIn
                          ? likeVideo(data.video)
                          : navigate("/login", {
                              state: { from: location },
                              replace: true,
                            })
                      }
                      disabled={likeLoading}
                    >
                      <ThumbUpOutlined />
                      <p className="action--title">Like</p>
                    </button>
                  )}
                  {data.isWatchLater ? (
                    <button
                      className={`btn icon--btn  video--action active ${
                        watchLaterLoading ? "btn--disabled" : ""
                      }`}
                      onClick={() => removeFromWatchLater(data.video._id)}
                      disabled={watchLaterLoading}
                    >
                      <WatchLater />
                      <p className="action--title">In Watch Later</p>
                    </button>
                  ) : (
                    <button
                      className={`btn icon--btn  video--action ${
                        watchLaterLoading ? "btn--disabled" : ""
                      }`}
                      onClick={() =>
                        authData.isLoggedIn
                          ? addToWatchLater(data.video)
                          : navigate("/login", {
                              state: { from: location },
                              replace: true,
                            })
                      }
                      disabled={watchLaterLoading}
                    >
                      <WatchLaterOutlined />
                      <p className="action--title">Watch Later</p>
                    </button>
                  )}
                  <button
                    className="btn icon--btn  video--action"
                    onClick={() =>
                      authData.isLoggedIn
                        ? videoDispatch({
                            type: videoContextConstant.SHOW_PLAYLIST_MODAL,
                            payload: { video: data.video },
                          })
                        : navigate("/login", {
                            state: { from: location },
                            replace: true,
                          })
                    }
                  >
                    <PlaylistAdd />
                    <p className="action--title">Playlist </p>
                  </button>
                </div>
              </div>
              <h2 className="heading--4 m-l-1">Description</h2>
              <div className="video--description">
                {data.video?.description?.length >= 250 ? (
                  <>
                    <span>
                      {showMore
                        ? data.video?.description
                        : data.video?.description.slice(0, 150)}
                    </span>
                    <button
                      className="btn--see"
                      onClick={() => setShowMore((prev) => !prev)}
                    >
                      {showMore ? "...see less" : "...see more"}
                    </button>
                  </>
                ) : (
                  data.video?.description
                )}
              </div>
            </div>
          </div>
          <div className="single--sidebar--container">
            <h2 className="m-t-1">Recommended Videos</h2>
            <div className="sidebar--video--container m-v-1">
              {data.recommendedVideos.map((video) => (
                <HorizontalCard video={video} key={video._id} />
              ))}
            </div>
            <h2 className="m-t-1">{`More Form ${data.video?.creator}`}</h2>
            <div className="sidebar--video--container m-v-1">
              {data.creatorVideos.map((video) => (
                <HorizontalCard video={video} key={video._id} />
              ))}
            </div>
          </div>
        </>
      ) : (
        "Error"
      )}
      {videoState.showPlaylistModal && <PlaylistModal />}
    </div>
  );
};
