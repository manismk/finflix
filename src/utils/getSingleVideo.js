import axios from "axios";

export const getSingleVideo = async (videoId) => {
  try {
    const { status, data } = await axios.get(`/video/${videoId}`);
    if (status === 200 && data.video !== null) {
      return data;
    } else {
      console.error("Error in getting single Product", e);
      return null;
    }
  } catch (e) {
    console.error("Error in getting single Product", e);
    return null;
  }
};
