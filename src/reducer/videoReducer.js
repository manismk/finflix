import { videoContextConstant } from "../constant";
import { getCategoryVideos } from "../utils";

let allVideos = [];

export const videoReducer = (state, action) => {
  switch (action.type) {
    case videoContextConstant.INITIAL_LOAD:
      allVideos = action.payload;
      return { ...state, videos: action.payload };
    case videoContextConstant.LOADING_CHANGE:
      return { ...state, isLoading: action.payload };
    case videoContextConstant.CATEGORY_CHANGE:
      return {
        ...state,
        videos: getCategoryVideos(allVideos, action.payload.category),
        category: action.payload.category,
      };
    default:
      return state;
  }
};
