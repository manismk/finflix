import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "./auth-context";

const WatchLaterContext = createContext();

const WatchLaterProvider = ({ children }) => {
  const [watchLater, setWatchLater] = useState([]);
  const [watchLaterLoading, setWatchLaterLoading] = useState(false);
  const { authData } = useAuth();

  useEffect(() => {
    if (authData.isLoggedIn) {
      (async () => {
        try {
          const { data, status } = await axios.get(`/user/watch-later`, {
            headers: { authorization: localStorage.getItem("finFlixToken") },
          });
          if (status === 200) {
            setWatchLater(data);
          }
        } catch (e) {
          setWatchLater([]);
          console.error("Error in Getting watchLater", e);
          toast.error("Something Went Wrong. Try again");
        }
      })();
    } else {
      setWatchLater([]);
    }
  }, [authData.isLoggedIn]);

  const addToWatchLater = async (video) => {
    setWatchLaterLoading(true);
    try {
      const { status, data } = await axios.post(
        "/user/watch-later",
        { video_id: video?._id },
        { headers: { authorization: localStorage.getItem("finFlixToken") } }
      );
      if (status === 201) {
        setWatchLater(data.watchlater);
      } else throw new Error(`Unhandled response status ${status}`);
    } catch (e) {
      console.error("Error in adding watchLater", e);
      toast.error("Something Went Wrong. Try again");
    } finally {
      setWatchLaterLoading(false);
    }
  };

  const removeFromWatchLater = async (videoId) => {
    setWatchLaterLoading(true);
    try {
      const { status, data } = await axios.delete(`/user/watch-later`, {
        headers: { authorization: localStorage.getItem("finFlixToken") },
        data: { video_id: videoId },
      });
      if (status === 200) {
        setWatchLater(data.watchlater);
      } else throw new Error(`Unhandled response status ${status}`);
    } catch (e) {
      console.error("Error in removing watchLater", e);
      toast.error("Something Went Wrong. Try again");
    } finally {
      setWatchLaterLoading(false);
    }
  };

  return (
    <WatchLaterContext.Provider
      value={{
        watchLater,
        watchLaterLoading,
        addToWatchLater,
        removeFromWatchLater,
      }}
    >
      {children}
    </WatchLaterContext.Provider>
  );
};

const useWatchLater = () => useContext(WatchLaterContext);

export { WatchLaterProvider, useWatchLater };
