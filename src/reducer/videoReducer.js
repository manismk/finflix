import { videoContextConstant } from "../constant";
import { getCategoryVideos } from "../utils";

export const videoReducer = (state, action) => {
  switch (action.type) {
    case videoContextConstant.INITIAL_LOAD:
      return { ...state, videos: action.payload, allVideos: action.payload };
    case videoContextConstant.LOADING_CHANGE:
      return { ...state, isLoading: action.payload };
    case videoContextConstant.CATEGORY_CHANGE:
      return {
        ...state,
        videos: getCategoryVideos(state.allVideos, action.payload.category),
        category: action.payload.category,
      };
    default:
      return state;
  }
};
