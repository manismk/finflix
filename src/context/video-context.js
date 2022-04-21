import { videoReducer } from "../reducer";
import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import { videoContextConstant } from "../constant";

const VideoContext = createContext();

const VideoProvider = ({ children }) => {
  const [videoState, videoDispatch] = useReducer(videoReducer, {
    videos: [],
    category: "all",
    isLoading: false,
    allVideos: [],
  });

  useEffect(() => {
    (async () => {
      try {
        videoDispatch({
          type: videoContextConstant.LOADING_CHANGE,
          payload: true,
        });

        const { data, status } = await axios.get("/api/videos");
        if (status === 200) {
          videoDispatch({
            type: videoContextConstant.INITIAL_LOAD,
            payload: data.videos,
          });
        } else
          throw new Error(`status code unhandled in initial load ${status}`);
      } catch (e) {
        console.error("Loading initial data", e);
      } finally {
        videoDispatch({
          type: videoContextConstant.LOADING_CHANGE,
          payload: false,
        });
      }
    })();
  }, []);

  return (
    <VideoContext.Provider value={{ videoState, videoDispatch }}>
      {children}
    </VideoContext.Provider>
  );
};

const useVideos = () => useContext(VideoContext);

export { VideoProvider, useVideos };
