import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter } from "react-router-dom";
import { VideoProvider } from "./context/video-context";
import {
  AuthProvider,
  HistoryProvider,
  LikesProvider,
  PlaylistProvider,
} from "./context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <VideoProvider>
          <LikesProvider>
            <HistoryProvider>
              <PlaylistProvider>
                <App />
              </PlaylistProvider>
            </HistoryProvider>
          </LikesProvider>
        </VideoProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
