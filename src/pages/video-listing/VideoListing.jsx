import { VideoCard } from "../../components";
import "./videoListing.css";

export const VideoListing = () => {
  return (
    <>
      <h1 className="text--center m-v-2">Videos</h1>
      <div className="grid grid--3--cols">
        {[...new Array(20)].map(() => (
          <VideoCard />
        ))}
      </div>
    </>
  );
  ``;
};
