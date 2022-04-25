export const getSearchResults = (videos, searchString) => {
  if (searchString === "") return videos;
  else
    return videos.filter((video) =>
      video.title.toLowerCase().includes(searchString.toLowerCase())
    );
};
