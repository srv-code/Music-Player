export enum Screen {
  lastPlayed = 'Last Played',
  playlists = 'Playlists',
  music = 'Music',
  video = 'Video',
  settings = 'Settings',
}

export interface PlayListItem {
  id: string;
  url: string;
  title: string;
  artist: string;
  artwork: string;
}

export interface PlayList {
  id: string;
  name: string;
  items: PlayListItem[];
}
