interface AnimeImages {
  jpg: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
  webp: {
    image_url: string;
    small_image_url: string;
    large_image_url: string;
  };
}

interface TrailerImages {
  image_url: string;
  small_image_url: string;
  medium_image_url: string;
  large_image_url: string;
  maximum_image_url: string;
}

interface Trailer {
  youtube_id: string;
  url: string;
  embed_url: string;
  images: TrailerImages;
}

interface Producer {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Genre {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Theme {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

interface Demographic {
  mal_id: number;
  type: string;
  name: string;
  url: string;
}

export interface Anime {
  mal_id: number;
  url: string;
  images: AnimeImages;
  trailer: Trailer;
  approved: boolean;
  titles: { type: string; title: string }[];
  title: string;
  title_english: string;
  title_japanese: string;
  title_synonyms: string[];
  type: string;
  source: string;
  episodes: number;
  status: string;
  airing: boolean;
  aired: {
    from: string;
    to: string;
    prop: {
      from: { day: number; month: number; year: number };
      to: { day: number; month: number; year: number };
    };
    string: string;
  };
  duration: string;
  rating: string;
  score: number;
  scored_by: number;
  rank: number;
  popularity: number;
  members: number;
  favorites: number;
  synopsis: string;
  background: string;
  season: string;
  year: number;
  broadcast: {
    day: string;
    time: string;
    timezone: string;
    string: string;
  };
  producers: Producer[];
  licensors: Producer[];
  studios: Producer[];
  genres: Genre[];
  explicit_genres: string[];
  themes: Theme[];
  demographics: Demographic[];
}

// Ejemplo de uso
// const dragonBallAnime: Anime = {
//   mal_id: 223,
//   url: "https://myanimelist.net/anime/223/Dragon_Ball",
//   images: {
//     jpg: {
//       image_url: "https://cdn.myanimelist.net/images/anime/1887/92364.jpg",
//       small_image_url:
//         "https://cdn.myanimelist.net/images/anime/1887/92364t.jpg",
//       large_image_url:
//         "https://cdn.myanimelist.net/images/anime/1887/92364l.jpg",
//     },
//     webp: {
//       image_url: "https://cdn.myanimelist.net/images/anime/1887/92364.webp",
//       small_image_url:
//         "https://cdn.myanimelist.net/images/anime/1887/92364t.webp",
//       large_image_url:
//         "https://cdn.myanimelist.net/images/anime/1887/92364l.webp",
//     },
//   },
//   trailer: {
//     youtube_id: "fg_fP7cRJXg",
//     url: "https://www.youtube.com/watch?v=fg_fP7cRJXg",
//     embed_url:
//       "https://www.youtube.com/embed/fg_fP7cRJXg?enablejsapi=1&wmode=opaque&autoplay=1",
//     images: {
//       image_url: "https://img.youtube.com/vi/fg_fP7cRJXg/default.jpg",
//       small_image_url: "https://img.youtube.com/vi/fg_fP7cRJXg/sddefault.jpg",
//       medium_image_url: "https://img.youtube.com/vi/fg_fP7cRJXg/mqdefault.jpg",
//       large_image_url: "https://img.youtube.com/vi/fg_fP7cRJXg/hqdefault.jpg",
//       maximum_image_url:
//         "https://img.youtube.com/vi/fg_fP7cRJXg/maxresdefault.jpg",
//     },
//   },
//   approved: true,
//   titles: [
//     { type: "Default", title: "Dragon Ball" },
//     { type: "Synonym", title: "Dragonball" },
//     { type: "Synonym", title: "DB" },
//     { type: "Japanese", title: "ドラゴンボール" },
//     { type: "English", title: "Dragon Ball" },
//   ],
//   title: "Dragon Ball",
//   title_english: "Dragon Ball",
//   title_japanese: "ドラゴンボール",
//   title_synonyms: ["Dragonball", "DB"],
//   type: "TV",
//   source: "Manga",
//   episodes: 153,
//   status: "Finished Airing",
//   airing: false,
//   aired: {
//     from: "1986-02-26T00:00:00+00:00",
//     to: "1989-04-12T00:00:00+00:00",
//     prop: {
//       from: { day: 26, month: 2, year: 1986 },
//       to: { day: 12, month: 4, year: 1989 },
//     },
//     string: "Feb 26, 1986 to Apr 12, 1989",
//   },
//   duration: "24 min per ep",
//   rating: "PG-13 - Teens 13 or older",
//   score: 7.97,
//   scored_by: 691858,
//   rank: 705,
//   popularity: 148,
//   members: 1080448,
//   favorites: 16893,
//   synopsis:
//     'Gokuu Son is a young boy who lives in the woods all alone—that is, until a girl named Bulma runs into him in her search for a set of magical objects called the "Dragon Balls." ...',
//   background:
//     "Adapts the first 194 chapters of Akira Toriyama’s Dragon Ball manga.",
//   season: "winter",
//   year: 1986,
//   broadcast: {
//     day: "Wednesdays",
//     time: "19:00",
//     timezone: "Asia/Tokyo",
//     string: "Wednesdays at 19:00 (JST)",
//   },
//   producers: [
//     {
//       mal_id: 169,
//       type: "anime",
//       name: "Fuji TV",
//       url: "https://myanimelist.net/anime/producer/169/Fuji_TV",
//     },
//     {
//       mal_id: 1365,
//       type: "anime",
//       name: "Shueisha",
//       url: "https://myanimelist.net/anime/producer/1365/Shueisha",
//     },
//   ],
//   licensors: [
//     {
//       mal_id: 102,
//       type: "anime",
//       name: "Funimation",
//       url: "https://myanimelist.net/anime/producer/102/Funimation",
//     },
//   ],
//   studios: [
//     {
//       mal_id: 18,
//       type: "anime",
//       name: "Toei Animation",
//       url: "https://myanimelist.net/anime/producer/18/Toei_Animation",
//     },
//   ],
//   genres: [
//     {
//       mal_id: 1,
//       type: "anime",
//       name: "Action",
//       url: "https://myanimelist.net/anime/genre/1/Action",
//     },
//     {
//       mal_id: 2,
//       type: "anime",
//       name: "Adventure",
//       url: "https://myanimelist.net/anime/genre/2/Adventure",
//     },
//     {
//       mal_id: 4,
//       type: "anime",
//       name: "Comedy",
//       url: "https://myanimelist.net/anime/genre/4/Comedy",
//     },
//     {
//       mal_id: 10,
//       type: "anime",
//       name: "Fantasy",
//       url: "https://myanimelist.net/anime/genre/10/Fantasy",
//     },
//   ],
//   explicit_genres: [],
//   themes: [
//     {
//       mal_id: 17,
//       type: "anime",
//       name: "Martial Arts",
//       url: "https://myanimelist.net/anime/genre/17/Martial_Arts",
//     },
//   ],
//   demographics: [
//     {
//       mal_id: 27,
//       type: "anime",
//       name: "Shounen",
//       url: "https://myanimelist.net/anime/genre/27/Shounen",
//     },
//   ],
// };
