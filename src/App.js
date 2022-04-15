import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components";
import { routes } from "./constant";
import { VideoListing } from "./pages/";
import MockMan from "mockman-js";

function App() {
  return (
    <div className="App  dark--theme">
      <div className="container--100">
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path={routes.EXPLORE_PAGE} element={<VideoListing />} />
            <Route path={"/mock"} element={<MockMan />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
