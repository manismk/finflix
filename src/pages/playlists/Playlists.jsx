import { Delete, Launch } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../constant";
import { usePlaylist } from "../../context";
import "./playlist.css";

export const Playlists = () => {
  const { playlist, deleteFromPlaylist } = usePlaylist();
  const navigate = useNavigate();
  return (
    <>
      <h1 className="text--center m-v-2">Playlists ({playlist.length})</h1>
      {playlist.length !== 0 ? (
        <div className="grid grid--3--cols">
          {playlist.map((playlistItem) => (
            <div className="playlist--card" key={playlistItem._id}>
              <div className="playlist--content">
                <h4 className="heading--3 playlist--title m-b-1">
                  {playlistItem.title}
                </h4>
                <p className="playlist--videos">
                  {playlistItem.videos.length} videos
                </p>
              </div>
              <div>
                <button
                  className="btn icon--btn"
                  title="Delete playlist"
                  onClick={() => deleteFromPlaylist(playlistItem)}
                >
                  <Delete />
                </button>
                <button
                  className="btn icon--btn"
                  title="Open playlist"
                  onClick={() => navigate(`/playlists/${playlistItem._id}`)}
                >
                  <Launch />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text--center m-v-2 para--md ">
          No Playlists Found.
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
