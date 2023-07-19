export const GoogleYoutubeFactory = (
  totalPage = 0
): GoogleApiYouTubePaginationInfo<GoogleApiYouTubeSearchResource> => {
  const name = 'Mock';
  const token = 'FirstToken';
  return {
    kind: name,
    etag: name,
    nextPageToken: token,
    prevPageToken: 'prev',

    pageInfo: {
      totalResults: totalPage,
      resultsPerPage: 0,
    },
    items: YoutubeResourceFactory(name),
  };
};

const generateDate = (name = 'Mock', livetitle = 'React Coding Live') => {
  return {
    kind: name,
    etag: name,
    id: {
      kind: name,
      videoId: name,
      channelId: name,
      playlistId: name,
    },
    snippet: {
      publishedAt: '2020-01-01T12:00:00Z',
      channelId: name,
      title: livetitle,
      description: name,
      thumbnails: {
        default: {
          url: name,
          width: 99,
          height: 99,
        },
        high: {
          url: name,
          width: 99,
          height: 99,
        },
        medium: {
          url: '/mock/image/hddefault.jpg',
          width: 336,
          height: 188,
        },
      },
      channelTitle: name,
    },
  };
};

export const YoutubeResourceFactory = (
  name = 'Mock'
): GoogleApiYouTubeSearchResource[] => {
  const reacts = Array.from({ length: 5 }, () => generateDate(name));
  const ff14 = Array.from({ length: 10 }, (_, index) =>
    generateDate(name, `[FF14]Ultimate ${name} ${index}Day`)
  );
  const ffxiv = Array.from({ length: 10 }, (_, index) =>
    generateDate(name, `-FFXIV- StoryLive ${name} ${index}Day`)
  );
  return [...reacts, ...ff14, ...ffxiv];
};
