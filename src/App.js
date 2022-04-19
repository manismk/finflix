import { Route, Routes } from "react-router-dom";
import { Navbar, RequiresAuth } from "./components";
import { routes } from "./constant";
import {
  Likes,
  Login,
  Profile,
  SignUp,
  SingleVideo,
  VideoListing,
} from "./pages/";
import MockMan from "mockman-js";

function App() {
  return (
    <div className="App  dark--theme">
      <div className="container--100">
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path={routes.EXPLORE_PAGE} element={<VideoListing />} />
            <Route path={routes.LOGIN_PAGE} element={<Login />} />
            <Route path={routes.SIGNUP_PAGE} element={<SignUp />} />
            <Route path={routes.SINGLE_PAGE} element={<SingleVideo />} />
            <Route element={<RequiresAuth />}>
              <Route path={routes.PROFILE_PAGE} element={<Profile />} />
              <Route path={routes.LIKED_PAGE} element={<Likes />} />
            </Route>
            <Route path={"/mock"} element={<MockMan />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
