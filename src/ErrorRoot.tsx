import React from "react";
import { useRouteError } from "react-router-dom";

export default function ErrorRoot() {
  const error = useRouteError() as any;
  console.error(error);

  return (
    <div>
      <h1>Error</h1>
      <i>{error.statusText || error.message}</i>
    </div>
  );
}
