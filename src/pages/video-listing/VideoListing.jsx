import { Loader, VideoCard } from "../../components";
import "./videoListing.css";
import { useVideos } from "../../context/";

export const VideoListing = () => {
  const { videoState } = useVideos();

  return (
    <>
      <h1 className="text--center m-v-2">Videos</h1>
      <div className="grid grid--3--cols">
        {videoState.videos.map((videoDetails) => (
          <VideoCard videoDetails={videoDetails} key={videoDetails._id} />
        ))}
      </div>
      {videoState.isLoading && <Loader />}
    </>
  );
  ``;
};
