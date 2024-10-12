import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { VideoProvider } from "./context/video-context";
import {
  AuthProvider,
  HistoryProvider,
  LikesProvider,
  PlaylistProvider,
  WatchLaterProvider,
} from "./context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <LikesProvider>
            <HistoryProvider>
              <PlaylistProvider>
                <WatchLaterProvider>
                  <App />
                </WatchLaterProvider>
              </PlaylistProvider>
            </HistoryProvider>
          </LikesProvider>
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
