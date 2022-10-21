export const baseURL = "https://superchauzette.github.io/api-kompa/api";

export type Artist = {
  name: string;
  slug: string;
};

export type Track = {
  url: string;
  title: string;
  artist: string;
  trackNumber: number;
  genre: string;
  album: string;
};

export type Album = {
  name: string;
  slugArtist: string;
  slugAlbum: string;
  artist: string;
  url: string;
  tracks: Track[];
};

export async function getArtists(): Promise<Artist[]> {
  const res = await fetch(`${baseURL}/artists.json`);
  const artists = await res.json();
  return artists;
}

export async function getAlbumsByArtistSlug(artistSlug: string): Promise<Album[]> {
  const res = await fetch(baseURL + "/albums.json");
  const albums = await res.json();
  const albumsByArtist = albums.filter((album) => album.slugArtist === artistSlug);
  return albumsByArtist;
}

export async function getAlbumBySlug(albumSlug: string): Promise<Album> {
  const res = await fetch(baseURL + "/albums.json");
  const albums = await res.json();
  const album = albums.find((album) => album.slugAlbum === albumSlug);
  return album;
}
