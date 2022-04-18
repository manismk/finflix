import axios from "axios";

export const getSingleVideo = async (videoId) => {
  try {
    const { status, data } = await axios.get(`/api/video/${videoId}`);
    if (status === 200 && data.video !== null) {
      return data.video;
    } else {
      console.error("Error in getting single Product", e);
      return null;
    }
  } catch (e) {
    console.error("Error in getting single Product", e);
    return null;
  }
};
