import { Route, Routes, useLocation } from "react-router-dom";
import { Navbar, RequiresAuth } from "./components";
import { routes, videoContextConstant } from "./constant";
import {
  Error404,
  History,
  Likes,
  Login,
  Playlists,
  Profile,
  SignUp,
  SinglePlaylist,
  SingleVideo,
  VideoListing,
  WatchLater,
} from "./pages/";
import MockMan from "mockman-js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import { useVideos } from "../src/context/index";

const getTheme = () => {
  if (localStorage && localStorage.getItem("finFlixTheme") !== null) {
    return localStorage.getItem("finFlixTheme");
  }
  return "dark";
};

function App() {
  const [theme, setTheme] = useState(getTheme());
  const { pathname } = useLocation();
  const { videoState, videoDispatch } = useVideos();
  useEffect(() => {
    window.scrollTo(0, 0);
    if (videoState.showPlaylistModal) {
      videoDispatch({
        type: videoContextConstant.CLOSE_PLAYLIST_MODAL,
        payload: { video: {} },
      });
    }
  }, [pathname]);
  return (
    <div className={`App  ${theme}--theme`}>
      <div className="container--100">
        <Navbar
          theme={theme}
          changeHandler={() =>
            theme === "dark" ? setTheme("light") : setTheme("dark")
          }
        />
        <div className="main-container">
          <Routes>
            <Route path={routes.EXPLORE_PAGE} element={<VideoListing />} />
            <Route path={routes.LOGIN_PAGE} element={<Login />} />
            <Route path={routes.SIGNUP_PAGE} element={<SignUp />} />
            <Route path={routes.SINGLE_PAGE} element={<SingleVideo />} />
            <Route element={<RequiresAuth />}>
              <Route path={routes.PROFILE_PAGE} element={<Profile />} />
              <Route path={routes.LIKED_PAGE} element={<Likes />} />
              <Route path={routes.HISTORY_PAGE} element={<History />} />
              <Route path={routes.PLAYLIST_PAGE} element={<Playlists />} />
              <Route
                path={routes.SINGLE_PLAYLIST}
                element={<SinglePlaylist />}
              />
              <Route path={routes.WATCH_LATER_PAGE} element={<WatchLater />} />
            </Route>
            <Route path="*" element={<Error404 />} />
            <Route path={"/mock"} element={<MockMan />} />
          </Routes>
          <ToastContainer
            position="top-right"
            autoClose={800}
            newestOnTop={true}
            pauseOnHover={true}
            limit={2}
            style={{ top: "6rem" }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
