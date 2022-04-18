import {
  KeyboardBackspace,
  ThumbUpOutlined,
  WatchLaterOutlined,
  PlaylistAdd,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HorizontalCard, Loader } from "../../components";
import { useVideos } from "../../context";
import {
  getSingleVideo,
  getRecommendedVideos,
  getCreatorVideos,
} from "../../utils/";

import "./singleVideo.css";

export const SingleVideo = () => {
  const params = useParams();
  const { videoState } = useVideos();

  const [data, setData] = useState({
    video: {},
    isLoading: false,
    recommendedVideos: [],
    creatorVideos: [],
    currentVideo: {},
  });

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      recommendedVideos: getRecommendedVideos(
        videoState.videos,
        params.videoId
      ),
      creatorVideos: getCreatorVideos(videoState.videos, params.videoId),
      currentVideo: videoState.videos.find(
        (video) => video._id === params.videoId
      ),
    }));
  }, [videoState.videos, params]);

  useEffect(() => {
    setData((prev) => ({ ...prev, isLoading: true }));
    (async () => {
      const video = await getSingleVideo(params.videoId);
      setData((prev) => ({ ...prev, video, isLoading: false }));
    })();
  }, [params]);

  return (
    <div className="grid--70--30 m-v-2">
      {data.isLoading && <Loader />}
      {data.video !== null ? (
        <>
          <div>
            <button className="btn btn--fab">
              <KeyboardBackspace />
            </button>
            <div className="video--container m-t-1">
              <embed
                className="embed--video "
                src={`https://www.youtube.com/embed/${data.video?._id}`}
              ></embed>
              <div className="video--title m-t-1 m-l-1">
                {data.video?.title}
              </div>
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
                  <button className="btn icon--btn  video--action">
                    <ThumbUpOutlined />
                    <p className="action--title">Like</p>
                  </button>
                  <button className="btn icon--btn  video--action">
                    <WatchLaterOutlined />
                    <p className="action--title">Watch Later</p>
                  </button>
                  <button className="btn icon--btn  video--action">
                    <PlaylistAdd />
                    <p className="action--title">Playlist </p>
                  </button>
                </div>
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
            <h2 className="m-t-1">{`More Form ${data.currentVideo?.creator}`}</h2>
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
    </div>
  );
};
