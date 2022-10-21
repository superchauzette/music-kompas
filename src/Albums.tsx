import React from "react";
import { json, NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getAlbumsByArtistSlug, baseURL, Album } from "./api.ts";

export async function loader({ params }) {
  const albumsByArtist = await getAlbumsByArtistSlug(params.artistSlug);
  return json({ albumsByArtist });
}

export default function Albums() {
  const { albumsByArtist } = useLoaderData() as { albumsByArtist: Album[] };

  return (
    <>
      <div className="albumsByArtist">
        {albumsByArtist.map((album) => (
          <AlbumLink key={album.slugAlbum} album={album} />
        ))}
      </div>
      <div className="albumSelected">
        <Outlet />
      </div>
    </>
  );
}

function AlbumLink({ album }) {
  return (
    <NavLink
      className="albumLink"
      style={({ isActive }) => ({ transform: isActive ? "scale(1.1)" : "" })}
      to={`${album.slugAlbum}`}
    >
      <img src={baseURL + album.url} alt={album.name} width="200px" />
      <p>{album.name}</p>
    </NavLink>
  );
}
