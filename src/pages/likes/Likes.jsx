import { Link } from "react-router-dom";
import { VideoCard } from "../../components";
import { routes } from "../../constant";
import { useLikes } from "../../context";

export const Likes = () => {
  const { likedVideos } = useLikes();
  return (
    <>
      <h1 className="text--center m-v-2">Liked Videos({likedVideos.length})</h1>
      {likedVideos.length !== 0 ? (
        <div className="grid grid--3--cols">
          {likedVideos.map((likedVideo) => (
            <VideoCard
              videoDetails={likedVideo}
              key={likedVideo._id}
              isFromLiked={true}
            />
          ))}
        </div>
      ) : (
        <p className="text--center m-v-2 para--md ">
          No Liked Videos Found.
          <Link
            to={routes.EXPLORE_PAGE}
            className="link primary-color para--md"
          >
            Explore More
          </Link>
        </p>
      )}
    </>
  );
};
