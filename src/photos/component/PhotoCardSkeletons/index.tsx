//import { memo } from "react";
import Skeleton from "@mui/material/Skeleton";
import React, { FC } from "react";

export const PhotoCardSkeleton = () => {
  return (
    <Skeleton variant="rectangular" animation="wave" height={194} width={345} />
  );
};

export const getSkeletons = (numberOfSkeletons: number) => {
  const elements = [];

  /*  [...Array(numberOfSkeletons).keys()].map((val, i) => (
    <div className="ml-2 mb-2">
      <PhotoCardSkeleton key={`wall_of_photos_skeleton_${i}`} />
    </div>
  )); */

  for (let i = 0; i < numberOfSkeletons; i++) {
    //let skel = getPhotoCardSkeleton(`${classes.container}_skeleton_${i}`);
    elements.push(
      <div className="ml-2 mb-2" key={`wall_of_photos_skeleton_${i}`}>
        <PhotoCardSkeleton />
      </div>
    );
  }

  return elements;
};

const PhotoCardSkeletons: FC<{ numberOfSkeletons: number }> = ({
  numberOfSkeletons,
}) => {
  //console.log("[PHOTO SKELETONS RENDER]", numberOfSkeletons);

  const elements = getSkeletons(numberOfSkeletons);

  return <>{elements}</>;
};

export default PhotoCardSkeletons;
