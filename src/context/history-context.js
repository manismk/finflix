import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./auth-context";
import { toast } from "react-toastify";

const HistoryContext = createContext();

const HistoryProvider = ({ children }) => {
  const [historyVideos, setHistoryVideos] = useState([]);
  const { authData } = useAuth();

  useEffect(() => {
    if (authData.isLoggedIn) {
      (async () => {
        try {
          const { data, status } = await axios.get(`/api/user/history`, {
            headers: { authorization: localStorage.getItem("finFlixToken") },
          });
          if (status === 200) {
            setHistoryVideos(data.history.reverse());
          }
        } catch (e) {
          setHistoryVideos([]);
          console.error("Error in Getting History", e);
          toast.error("Something Went Wrong. Try again");
        }
      })();
    } else {
      setHistoryVideos([]);
    }
  }, [authData.isLoggedIn]);

  const addToHistory = async (video) => {
    const alreadyInHistory = historyVideos.find(
      (historyVideo) => historyVideo._id === video._id
    );
    if (alreadyInHistory) {
      setHistoryVideos((prev) => [
        alreadyInHistory,
        ...prev.filter((historyVideo) => historyVideo._id !== video._id),
      ]);
    } else {
      try {
        const { status, data } = await axios.post(
          "/api/user/history",
          { video },
          {
            headers: {
              authorization: localStorage.getItem("finFlixToken"),
            },
          }
        );
        if (status === 201) setHistoryVideos(data.history.reverse());
      } catch (e) {
        console.error("Error in Adding History", e);
      }
    }
  };

  const removeFromHistory = async (videoId) => {
    try {
      const { status, data } = await axios.delete(
        `/api/user/history/${videoId}`,
        {
          headers: {
            authorization: localStorage.getItem("finFlixToken"),
          },
        }
      );
      if (status === 200) setHistoryVideos(data.history.reverse());
    } catch (e) {
      console.error("Error in Removing History", e);
    }
  };
  const clearHistory = async () => {
    try {
      const { status, data } = await axios.delete(`/api/user/history/all`, {
        headers: {
          authorization: localStorage.getItem("finFlixToken"),
        },
      });
      if (status === 200) setHistoryVideos(data.history.reverse());
    } catch (e) {
      console.error("Error in Removing all History", e);
    }
  };

  return (
    <HistoryContext.Provider
      value={{ historyVideos, addToHistory, removeFromHistory, clearHistory }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

const useHistory = () => useContext(HistoryContext);

export { HistoryProvider, useHistory };
