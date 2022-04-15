export const getCategoryVideos = (videos, category) => {
  if (category === "all") return videos;
  return videos.filter((video) => video.category === category);
};
