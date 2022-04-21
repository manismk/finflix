import { ClearAll } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { VideoCard } from "../../components";
import { routes } from "../../constant";
import { useHistory } from "../../context";

export const History = () => {
  const { historyVideos, removeFromHistory, clearHistory } = useHistory();
  return (
    <>
      <h1 className="text--center m-v-2">
        History Videos({historyVideos.length})
      </h1>

      {historyVideos.length !== 0 ? (
        <>
          <div className="m-b-1 clear--container">
            <p></p>
            <button className="btn icon--btn" onClick={() => clearHistory()}>
              <ClearAll />
              Clear History
            </button>
          </div>
          <div className="grid grid--3--cols">
            {historyVideos.map((historyVideo) => (
              <VideoCard
                videoDetails={historyVideo}
                key={historyVideo._id}
                showDelete={true}
                from="History"
                deleteCallBack={() => removeFromHistory(historyVideo._id)}
              />
            ))}
          </div>
        </>
      ) : (
        <p className="text--center m-v-2 para--md ">
          No History Found.
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
