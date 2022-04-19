import axios from "axios";
import { useAuth } from "./";

const { createContext, useContext, useState, useEffect } = require("react");

const LikesContext = createContext();

const LikesProvider = ({ children }) => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [likeLoading, setLikeLoading] = useState(false);
  const { authData } = useAuth();

  useEffect(() => {
    if (authData.isLoggedIn) {
      (async () => {
        try {
          const { data, status } = await axios.get(`/api/user/likes`, {
            headers: { authorization: localStorage.getItem("finFlixToken") },
          });
          if (status === 200) {
            setLikedVideos(data.likes);
          }
        } catch (e) {
          setLikedVideos([]);
          console.error("Error in Getting Likes", e);
        }
      })();
    } else {
      setLikedVideos([]);
    }
  }, [authData.isLoggedIn]);

  const likeVideo = async (video) => {
    setLikeLoading(true);
    try {
      const { status, data } = await axios.post(
        "/api/user/likes",
        {
          video,
        },
        {
          headers: { authorization: localStorage.getItem("finFlixToken") },
        }
      );
      if (status === 201) {
        setLikedVideos(data.likes);
      } else throw new Error(`Unhandled response status ${status}`);
    } catch (e) {
      console.error("Error in Liking the video", e);
    } finally {
      setLikeLoading(false);
    }
  };

  const removeLike = async (videoId) => {
    setLikeLoading(true);
    try {
      const { data, status } = await axios.delete(
        `/api/user/likes/${videoId}`,
        {
          headers: { authorization: localStorage.getItem("finFlixToken") },
        }
      );
      if (status === 200) {
        setLikedVideos(data.likes);
      } else throw new Error(`Unhandled response status ${status}`);
    } catch (e) {
      console.error("Error in removing the like", e);
    } finally {
      setLikeLoading(false);
    }
  };

  return (
    <LikesContext.Provider
      value={{ likedVideos, likeLoading, likeVideo, removeLike }}
    >
      {children}
    </LikesContext.Provider>
  );
};

const useLikes = () => useContext(LikesContext);

export { LikesProvider, useLikes };
