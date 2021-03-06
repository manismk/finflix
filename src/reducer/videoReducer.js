import { videoContextConstant } from "../constant";
import { getCategoryVideos, getSearchResults } from "../utils";

export const videoReducer = (state, action) => {
  switch (action.type) {
    case videoContextConstant.INITIAL_LOAD:
      return { ...state, videos: action.payload, allVideos: action.payload };
    case videoContextConstant.LOADING_CHANGE:
      return { ...state, isLoading: action.payload };
    case videoContextConstant.CATEGORY_CHANGE:
      return {
        ...state,
        videos: getSearchResults(
          getCategoryVideos(state.allVideos, action.payload.category),
          state.searchText
        ),
        category: action.payload.category,
      };
    case videoContextConstant.SHOW_PLAYLIST_MODAL:
      return {
        ...state,
        showPlaylistModal: true,
        currentVideo: action.payload.video,
      };
    case videoContextConstant.CLOSE_PLAYLIST_MODAL:
      return {
        ...state,
        showPlaylistModal: false,
        currentVideo: action.payload.video,
      };

    case videoContextConstant.SEARCH_VIDEO:
      return {
        ...state,
        videos: getSearchResults(
          getCategoryVideos(state.allVideos, state.category),
          action.payload.search
        ),
        searchText: action.payload.search,
      };
    default:
      return state;
  }
};
