import React from "react";
import { useLoaderData, json, NavLink, useSearchParams } from "react-router-dom";
import { getAlbumBySlug, Album as AlbumType, baseURL } from "./api.ts";

export async function loader({ params }) {
  const album = await getAlbumBySlug(params.albumSlug);
  return json({ album });
}

export default function Album() {
  const { album } = useLoaderData() as { album: AlbumType };
  let [searchParams] = useSearchParams();

  const trackNumberSelected = Number(searchParams.get("trackNumber"));
  const trackSelected = album.tracks.find((track) => track.trackNumber === trackNumberSelected);

  return (
    <>
      <div className="album">
        <div>
          <h3>{album.name}</h3>
          <img src={baseURL + album.url} alt={album.name} width="400px" />
        </div>
        <div className="tracks">
          {album.tracks
            .sort((a, b) => a.trackNumber - b.trackNumber)
            .map((track) => (
              <Track key={track.trackNumber} track={track} isActive={trackNumberSelected === track.trackNumber} />
            ))}
        </div>
      </div>
      <div>
        <Player track={trackSelected} />
      </div>
    </>
  );
}

function Track({ track, isActive }) {
  return (
    <NavLink style={{ fontWeight: isActive ? "bold" : "" }} to={`?trackNumber=${track.trackNumber}`}>
      {`${track.trackNumber} -  ${track.title}`}
    </NavLink>
  );
}

function Player({ track }) {
  if (!track) return null;

  return (
    <div className="player">
      <p>
        {track.title} - {track.artist} - {track.album}
      </p>
      <audio src={baseURL + track.url} autoPlay />
    </div>
  );
}
