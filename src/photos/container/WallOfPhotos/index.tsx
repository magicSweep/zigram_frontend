import React, { memo, lazy, Suspense } from "react";
//import WallOfPhotos from "./WallOfPhotos";
import { useAuth } from "../../../auth/hook/useAuth";
import Fallback from "./Fallback";
//import loadable from "@loadable/component";

const LoadableWallOfPhotos = lazy(() => import("./WallOfPhotos"));

export const WallOfPhotosLoadableWrapper = () => {
  const { isAuth } = useAuth();

  //console.log("[RENDER WallOfPhotosLoadableWrapper MAIN]");

  if (isAuth === false) return null;

  return (
    <Suspense fallback={<Fallback />}>
      <LoadableWallOfPhotos />
    </Suspense>
  );
};

export default memo(WallOfPhotosLoadableWrapper);
