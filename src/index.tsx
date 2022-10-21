import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements, redirect } from "react-router-dom";
import Root from "./Root.tsx";
import ErrorRoot from "./ErrorRoot.tsx";
import Artists, { loader as loaderMain } from "./Artists.tsx";
import Albums, { loader as albumsLoader } from "./Albums.tsx";
import Album, { loader as albumLoader } from "./Album.tsx";

import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />} errorElement={<ErrorRoot />}>
      <Route index loader={() => redirect("/artists")} />
      <Route path="artists" element={<Artists />} loader={loaderMain}>
        <Route path=":artistSlug/albums" element={<Albums />} loader={albumsLoader}>
          <Route path=":albumSlug" element={<Album />} loader={albumLoader} />
        </Route>
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
