import axios from "axios";

export const getSinglePlaylist = async (playlistId) => {
  try {
    const { status, data } = await axios.get(
      `/api/user/playlists/${playlistId}`,
      { headers: { authorization: localStorage.getItem("finFlixToken") } }
    );
    if (status === 200 && data.playlist !== undefined) {
      return data.playlist;
    } else throw new Error(`Unhandled response in single playlist ${status}`);
  } catch (e) {
    console.error("Error in getting single playlist", e);
    return null;
  }
};
