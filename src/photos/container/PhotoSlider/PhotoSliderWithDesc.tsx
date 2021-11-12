import IconButton from "@mui/material/IconButton";
import Box from "@mui/system/Box";
import React, { FC, useState, useCallback } from "react";
import PhotoSliderWidget, { PhotoSliderProps } from "./PhotoSliderWidget";
import CloseIcon from "@mui/icons-material/Close";
import PhotoDesc from "../../component/PhotoDesc";
import { Photo, FirestoreDate } from "../../types";

export type PhotoSliderWithDescProps = Omit<
  PhotoSliderProps,
  "onToggleDesc"
> & {
  activePhoto?: Photo<FirestoreDate>;
  //showEditPhotoForm?: () => void;
  isEditingActivePhoto: boolean;
};

const PhotoSliderWithDesc: FC<PhotoSliderWithDescProps> = ({
  activePhoto,
  isEditingActivePhoto,
  ...props
}) => {
  const [width, setWidth] = useState(0);

  const toggleDesc = useCallback(
    () => setWidth((width) => (width === 0 ? 300 : 0)),
    []
  );

  //console.log("[RENDER PHOTO SLIDER WITH DESC]");

  return (
    <Box className="w-full h-full flex flex-nowrap flex-grow-0 flex-shrink-0 bg-black overflow-hidden">
      <PhotoSliderWidget
        {...props}
        isEditingActivePhoto={isEditingActivePhoto}
        onToggleDesc={toggleDesc}
      />
      <Box
        sx={{
          //height: "100%",
          width: `${width}px`,
          transitionProperty: "width",
          transitionDuration: "0.5s",
          bgcolor: "background.paper",
        }}
      >
        <IconButton onClick={toggleDesc} aria-label="скрыть описание фото">
          <CloseIcon
            fontSize="small"
            sx={{
              color: "secondary.main",
            }}
          />
        </IconButton>
        <PhotoDesc
          photo={activePhoto}
          photoLoading={props.loading}
          photoError={props.error}
          isEditable={props.isEditableActivePhoto}
          isPhotoEditing={isEditingActivePhoto}
          downloadOriginalPhotoUrl={props.downloadOriginalPhotoUrl}
          //tagsState: ITagsState;
          showEditPhotoForm={props.showEditPhotoForm}
        />
      </Box>
    </Box>
  );
};

export default PhotoSliderWithDesc;
