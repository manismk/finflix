export const routes = {
  EXPLORE_PAGE: "/",
  LIKED_PAGE: "/likes",
  WATCH_LATER_PAGE: "/watch-later",
  PLAYLIST_PAGE: "/playlist",
  HISTORY_PAGE: "/history",
  LOGIN_PAGE: "/login",
  SIGNUP_PAGE: "/signUp",
  PROFILE_PAGE: "/profile",
  SINGLE_PAGE: "/videos/:videoId",
  SINGLE_PLAYLIST: "/playlists/:playlistId",
};

export const videoContextConstant = {
  INITIAL_LOAD: "INITIAL_LOAD",
  CATEGORY_CHANGE: "CATEGORY_CHANGE",
  LOADING_CHANGE: "LOADING_CHANGE",
  SHOW_PLAYLIST_MODAL: "SHOW_PLAYLIST_MODAL",
  CLOSE_PLAYLIST_MODAL: "CLOSE_PLAYLIST_MODAL",
};
