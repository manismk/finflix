import { videoContextConstant } from "../constant";

export const videoReducer = (state, action) => {
  switch (action.type) {
    case videoContextConstant.INITIAL_LOAD:
      return { ...state, videos: action.payload };
    case videoContextConstant.LOADING_CHANGE:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};
