export const getRecommendedVideos = (videos, videoId) => {
  const currentVideo = videos.find((video) => video?._id === videoId);
  return videos.filter(
    (video) =>
      video?.category === currentVideo?.category && video?._id !== videoId
  );
};
