import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Loader, VideoCard } from "../../components";
import { routes } from "../../constant";
import { usePlaylist } from "../../context";
import { getSinglePlaylist } from "../../utils";

export const SinglePlaylist = () => {
  const params = useParams();
  const [currentPlaylist, setCurrentPlaylist] = useState({
    playlist: {},
    isLoading: false,
  });
  const { playlist, removeVideoFromPlaylist } = usePlaylist();

  useEffect(() => {
    setCurrentPlaylist((prev) => ({ ...prev, isLoading: true }));
    (async () => {
      const playlist = await getSinglePlaylist(params.playlistId);
      setCurrentPlaylist((prev) => ({ ...prev, playlist, isLoading: false }));
    })();
  }, [params, playlist]);

  return (
    <>
      {currentPlaylist.isLoading && <Loader />}
      {currentPlaylist.playlist !== null ? (
        <>
          <h1 className="text--center m-v-2">{`${currentPlaylist?.playlist?.title} (${currentPlaylist?.playlist?.videos?.length})`}</h1>
          {currentPlaylist?.playlist?.videos?.length !== 0 ? (
            <div className="grid grid--3--cols">
              {currentPlaylist?.playlist?.videos?.map((playlistVideo) => (
                <VideoCard
                  videoDetails={playlistVideo}
                  key={playlistVideo._id}
                  showDelete={true}
                  from={"video from playlist"}
                  deleteCallBack={() =>
                    removeVideoFromPlaylist(
                      currentPlaylist?.playlist,
                      playlistVideo
                    )
                  }
                />
              ))}
            </div>
          ) : (
            <p className="text--center m-v-2 para--md ">
              No Videos Found in {`${currentPlaylist?.playlist?.title}`}.
              <Link
                to={routes.EXPLORE_PAGE}
                className="link primary-color para--md"
              >
                Explore More
              </Link>
            </p>
          )}
        </>
      ) : (
        "Error in getting single playlist"
      )}
    </>
  );
};
