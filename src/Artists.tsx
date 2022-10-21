import React from "react";
import { NavLink, Outlet, useLoaderData } from "react-router-dom";
import { getArtists, Artist } from "./api.ts";

export function loader() {
  return getArtists();
}

export default function Artists() {
  const artists = useLoaderData() as Artist[];

  return (
    <main>
      <div className="artists">
        {artists.map((artist) => (
          <ArtistLink key={artist.slug} artist={artist} />
        ))}
      </div>
      <div className="albums">
        <Outlet />
      </div>
    </main>
  );
}

type ArtistProps = {
  artist: Artist;
};

function ArtistLink({ artist }: ArtistProps) {
  return (
    <NavLink
      to={`${artist.slug}/albums`}
      style={({ isActive }) => ({
        color: isActive ? "red" : "blue",
        textDecoration: "none",
      })}
    >
      {artist.name}
    </NavLink>
  );
}
