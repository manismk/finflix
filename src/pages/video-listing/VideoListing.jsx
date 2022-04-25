import { Filters, Loader, PlaylistModal, VideoCard } from "../../components";
import "./videoListing.css";
import { useVideos } from "../../context/";

export const VideoListing = () => {
  const { videoState } = useVideos();

  return (
    <>
      <h1 className="text--center m-v-2">{`Videos (${videoState.videos.length})`}</h1>
      <Filters />
      {videoState.videos.length > 0 ? (
        <div className="grid grid--3--cols">
          {videoState.videos.map((videoDetails) => (
            <VideoCard videoDetails={videoDetails} key={videoDetails._id} />
          ))}
        </div>
      ) : (
        <p className="text--center m-v-2 para--md ">{`No videos found for term "${
          videoState.searchText
        }" with "${videoState.category.split("-").join(" ")}" category`}</p>
      )}
      {videoState.isLoading && <Loader />}
      {videoState.showPlaylistModal && <PlaylistModal />}
    </>
  );
  ``;
};
