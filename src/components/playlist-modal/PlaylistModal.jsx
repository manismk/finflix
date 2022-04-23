import { Close, Done } from "@mui/icons-material";
import { useState } from "react";
import { videoContextConstant } from "../../constant";
import { usePlaylist, useVideos } from "../../context";
import "./playlistModal.css";

export const PlaylistModal = () => {
  const [showCreateForm, setCreateForm] = useState();
  const [playlistData, setPlaylistData] = useState({ enteredValue: "" });
  const {
    playlist,
    addToPlaylist,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
  } = usePlaylist();
  const { videoDispatch, videoState } = useVideos();

  const playlistToggleHandler = (e, playlistItem) => {
    if (e.target.checked)
      addVideoToPlaylist(playlistItem, videoState.currentVideo);
    else removeVideoFromPlaylist(playlistItem, videoState.currentVideo);
  };

  return (
    <>
      <div className="modal playlist--modal z-30">
        <button
          className="btn icon--btn  close--btn"
          onClick={() =>
            videoDispatch({
              type: videoContextConstant.CLOSE_PLAYLIST_MODAL,
              payload: { video: {} },
            })
          }
        >
          <Close />
        </button>
        <div className="playlist--label">
          {!showCreateForm && (
            <button
              className="btn w-100 m-v-1"
              onClick={() => setCreateForm(true)}
            >
              Create New Playlist
            </button>
          )}
          {showCreateForm && (
            <>
              <input
                type="text"
                placeholder="Add playlist name here"
                onChange={(e) =>
                  setPlaylistData((prev) => ({
                    ...prev,
                    enteredValue: e.target.value,
                  }))
                }
                value={playlistData.enteredValue}
              />
              <button
                className={`btn icon--btn ${
                  !playlistData.enteredValue.length ? "btn--disabled" : ""
                }`}
                disabled={!playlistData.enteredValue.length}
                onClick={() => {
                  addToPlaylist(playlistData.enteredValue);
                  setPlaylistData((prev) => ({
                    ...prev,
                    enteredValue: "",
                  }));
                  setCreateForm(false);
                }}
              >
                <Done />
              </button>
            </>
          )}
        </div>
        <div className="m-t-1">
          {playlist.length > 0 ? (
            <>
              <h4 className="heading--4 text--center m-t-1">
                Available Playlists
              </h4>
              <div className="playlist--container">
                {playlist.map((playlistItem) => (
                  <label key={playlistItem._id}>
                    <input
                      type="checkbox"
                      onChange={(e) => playlistToggleHandler(e, playlistItem)}
                      checked={
                        playlistItem.videos.find(
                          (playlistVideo) =>
                            playlistVideo._id === videoState.currentVideo._id
                        ) === undefined
                          ? false
                          : true
                      }
                    />
                    {playlistItem.title}
                  </label>
                ))}
              </div>
            </>
          ) : (
            <p className="text--center  para--md ">No Playlists found</p>
          )}
        </div>
      </div>
      <div
        className="overlay z-25"
        onClick={() =>
          videoDispatch({
            type: videoContextConstant.CLOSE_PLAYLIST_MODAL,
            payload: { video: {} },
          })
        }
      ></div>
    </>
  );
};
