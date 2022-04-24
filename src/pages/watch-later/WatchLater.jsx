import { Link } from "react-router-dom";
import { VideoCard } from "../../components";
import { routes } from "../../constant";
import { useWatchLater } from "../../context";

export const WatchLater = () => {
  const { watchLater, removeFromWatchLater } = useWatchLater();
  return (
    <>
      <h1 className="text--center m-v-2">
        Watch Later Videos({watchLater.length})
      </h1>
      {watchLater.length !== 0 ? (
        <div className="grid grid--3--cols">
          {watchLater.map((watchLaterVideo) => (
            <VideoCard
              videoDetails={watchLaterVideo}
              key={watchLaterVideo._id}
              showDelete={true}
              from={"Watch Later"}
              deleteCallBack={() => removeFromWatchLater(watchLaterVideo._id)}
            />
          ))}
        </div>
      ) : (
        <p className="text--center m-v-2 para--md ">
          No Watch Later Videos Found.
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
