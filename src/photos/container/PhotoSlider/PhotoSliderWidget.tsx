import Box from "@mui/system/Box";
import React, {
  FC,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useCarousel } from "../../../container/Carousel/hook/useCarousel";
import { Photo, FirestoreDate } from "lizzygram-common-data/dist/types";
import { useImgZoom } from "../../hook/useImgZoom";
import SliderBar from "../SliderBar";
import { FullscreenProps } from "../../../component/Fullscreen";
import SliderChildren from "./SliderChidren";
import SliderControls from "../SliderControls";
import { isIncreaseAfterLoading } from "./helper";
import { PhotoFavoriteProps } from "../../component/PhotoFavorite";
//import { DownloadOriginalPhotoData } from "./../../types";

export type PhotoSliderProps = Omit<
  PhotoFavoriteProps,
  "photoId" | "favoriteBy"
> &
  FullscreenProps & {
    //editedPhotoIds: string[];
    //initActiveIndex: number;
    //photoState: IPhotosState;
    photos: Photo<FirestoreDate>[] | undefined;
    loading: boolean;
    hasNextPage: boolean;
    error: boolean;
    loadMorePhotos: () => void;
    onClose: (event: any) => void;
    onToggleDesc: (event: any) => void;
    isEditingActivePhoto: boolean;
    isEditableActivePhoto: boolean;
    isEditor: boolean;
    showEditPhotoForm: () => void;
    //downloadOriginalPhotoUrl: string;
    //downloadPhotoData: DownloadOriginalPhotoData;
    userUid: string;
    activeIndex: number;
    increaseIndex: () => void;
    decreaseIndex: () => void;
    //fullscreenElemRef: MutableRefObject<any>;
  };

const useIncreaseIndexAfterFetchPhotos = (
  photosLength: number,
  loading: boolean,
  activeIndex: number,
  increaseIndex: () => void
) => {
  const mainRef: MutableRefObject<any> = useRef({
    prevPhotosLoading: false,
    prevPhotosLength: photosLength,
  });

  useEffect(() => {
    if (
      isIncreaseAfterLoading(
        photosLength > 0,
        mainRef.current.prevPhotosLoading,
        loading,
        mainRef.current.prevPhotosLength,
        activeIndex
      )
    ) {
      increaseIndex();
    }

    mainRef.current.prevPhotosLoading = loading;
    mainRef.current.prevPhotosLength = photosLength;
  }, [loading]);
};

const onFetchMore =
  (valuesRef: MutableRefObject<any>, loadMorePhotos: () => void) => () => {
    const { photos, hasNextPage, loading } = valuesRef.current;

    //console.log("ON FETCH MORE", photos, hasNextPage, loading);
    if (photos !== undefined && hasNextPage === true && loading === false) {
      loadMorePhotos();
    }
  };

const PhotoSliderWidget: FC<PhotoSliderProps> = ({
  photos,
  //initActiveIndex,
  isEditableActivePhoto,
  isEditingActivePhoto,
  isEditor,
  onClose,
  onToggleDesc,
  showEditPhotoForm,
  //downloadPhotoData,
  userUid,
  loading,
  error,
  hasNextPage,
  loadMorePhotos,
  activeIndex,
  increaseIndex,
  decreaseIndex,
  requestFullscreen,
  exitFullscreen,
  isFullscreen,
  ...props
  //fullscreenElemRef,
}) => {
  const photosLength = photos === undefined ? 0 : photos.length;

  const mainRef: MutableRefObject<any> = useRef({
    photos,
    hasNextPage,
    loading,
  });

  mainRef.current.photos = photos;
  mainRef.current.hasNextPage = hasNextPage;
  mainRef.current.loading = loading;

  /* const { activeIndex, increaseIndex, decreaseIndex } = useCarousel(
    photosLength,
    initActiveIndex
  ); */

  const { handleSliderChange, cancel, zoom, value } = useImgZoom();

  useIncreaseIndexAfterFetchPhotos(
    photosLength,
    loading,
    activeIndex,
    increaseIndex
  );

  const fetchMore = useCallback(onFetchMore(mainRef, loadMorePhotos), [
    loadMorePhotos,
  ]);

  //console.log("[RENDER PHOTO SLIDER WIDGET]", zoom, value);

  return (
    <>
      <div
        /* ref={fullscreenElemRef}
        id="super_photo_slider_23klj2342" */
        className="relative w-full h-full bg-photocard overflow-auto"
      >
        <SliderChildren
          photos={photos}
          activeIndex={activeIndex}
          zoom={zoom}
          isEditingActivePhoto={isEditingActivePhoto}
          photosLoading={loading}
          photosError={error}
        />

        {zoom === 0 && (
          <SliderControls
            itemsLength={photosLength}
            increaseIndex={increaseIndex}
            decreaseIndex={decreaseIndex}
            activeIndex={activeIndex}
            fetchMore={fetchMore}
            hasNextPage={hasNextPage}
          />
        )}

        <SliderBar
          photos={photos}
          activeIndex={activeIndex}
          handleSliderChange={handleSliderChange}
          zoom={value}
          cancel={cancel}
          onClose={onClose}
          onToggleDesc={onToggleDesc}
          isEditable={isEditableActivePhoto}
          isEditor={isEditor}
          showEditPhotoForm={showEditPhotoForm}
          //downloadPhotoData={downloadPhotoData}
          userUid={userUid}
          imageExtension={
            photos === undefined ? "" : photos[activeIndex].imageExtention
          }
          googleDriveId={
            photos === undefined ? "" : photos[activeIndex].googleDriveId
          }
          requestFullscreen={requestFullscreen}
          exitFullscreen={exitFullscreen}
          isFullscreen={isFullscreen}
          {...props}
        />
      </div>
    </>
  );
};

export default PhotoSliderWidget;
