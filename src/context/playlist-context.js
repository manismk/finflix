import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./auth-context";

const PlaylistContext = createContext();

const PlaylistProvider = ({ children }) => {
  const [playlist, setPlaylist] = useState([]);
  const { authData } = useAuth();

  useEffect(() => {
    if (authData.isLoggedIn) {
      (async () => {
        try {
          const { data, status } = await axios.get(`/user/playlist`, {
            headers: { authorization: localStorage.getItem("finFlixToken") },
          });
          if (status === 200) {
            setPlaylist(data);
          }
        } catch (e) {
          setPlaylist([]);
          console.error("Error in Getting Playlist", e);
          toast.error("Something Went Wrong. Try again");
        }
      })();
    } else {
      setPlaylist([]);
    }
  }, [authData.isLoggedIn]);

  const addToPlaylist = async (title) => {
    try {
      const { status, data } = await axios.post(
        "/user/playlist",
        { name: title },
        { headers: { authorization: localStorage.getItem("finFlixToken") } }
      );
      if (status === 201) {
        setPlaylist(data.playlists);
        toast.success(`New Playlist has been created with Title: ${title}`);
      } else throw new Error(`Unhandled response status ${status}`);
    } catch (e) {
      console.error("Error in adding playlist", e);
      toast.error(`Something went wrong`);
    }
  };

  const deleteFromPlaylist = async (playlist) => {
    try {
      const { status, data } = await axios.delete(
        `/user/playlist/${playlist._id}`,
        { headers: { authorization: localStorage.getItem("finFlixToken") } }
      );
      if (status === 200) {
        setPlaylist(data.playlists);
        toast.success(`${playlist.title} has been deleted`);
      } else throw new Error(`Unhandled response status ${status}`);
    } catch (e) {
      console.error("Error in deleting playlist", e);
      toast.error(`Something went wrong`);
    }
  };

  const addVideoToPlaylist = async (playlistItem, video) => {
    try {
      const { data, status } = await axios.post(
        `/user/playlist/${playlistItem._id}/${video?._id}`,
        {},
        { headers: { authorization: localStorage.getItem("finFlixToken") } }
      );
      if (status === 201) {
        setPlaylist(data.playlists);
        toast.success(`${video.title} has been added to ${playlistItem.name}`);
      } else throw new Error(`Unhandled response status ${status}`);
    } catch (e) {
      console.error("Error in adding video to playlist", e);
      toast.error(`Something went wrong`);
    }
  };

  const removeVideoFromPlaylist = async (playlistItem, video) => {
    try {
      const { data, status } = await axios.delete(
        `/user/playlist/${playlistItem._id}/${video._id}`,
        { headers: { authorization: localStorage.getItem("finFlixToken") } }
      );
      if (status === 200) {
        setPlaylist(data.playlists);
        toast.success(
          `${video.title} has been removed from ${playlistItem.name}`
        );
      } else throw new Error(`Unhandled response status ${status}`);
    } catch (e) {
      console.error("Error in removing video from playlist", e);
      toast.error(`Something went wrong`);
    }
  };

  return (
    <PlaylistContext.Provider
      value={{
        addToPlaylist,
        playlist,
        addVideoToPlaylist,
        removeVideoFromPlaylist,
        deleteFromPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylist = () => useContext(PlaylistContext);

export { usePlaylist, PlaylistProvider };
