import React, { FC } from "react";
import { DownloadPhotoProps } from "./types";
import Link from "@mui/material/Link";
import { makeDownloadPhotoData } from "./DownloadPhoto.helper";

export const DownloadPhotoLink: FC<DownloadPhotoProps> = ({
  // userUid,
  googleDriveId,
  imageExtension,
  downloadPhotoUrl,
}) => {
  const { downloadAttr, href } = makeDownloadPhotoData(
    googleDriveId,
    //userUid,
    imageExtension as any,
    downloadPhotoUrl
  );

  return (
    <Link download={downloadAttr} href={href}>
      Скачать
    </Link>
  );
};

export default DownloadPhotoLink;
