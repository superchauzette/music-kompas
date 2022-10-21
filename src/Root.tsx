import React from "react";
import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <>
      <header>
        <h1>Compas</h1>
      </header>
      <Outlet />
    </>
  );
}
