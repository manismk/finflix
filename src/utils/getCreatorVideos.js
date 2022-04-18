export const getCreatorVideos = (videos, videoId) => {
  const currentVideo = videos.find((video) => video?._id === videoId);
  return videos.filter(
    (video) =>
      video?.creator === currentVideo?.creator && video?._id !== videoId
  );
};
