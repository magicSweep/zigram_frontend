import React, { useEffect } from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {
  batch,
  Provider as ReduxProvider,
  useDispatch,
  useSelector,
} from "react-redux";
import thunk from "redux-thunk";
//import Providers from "./../../provider/container/Providers";
//import { initApp } from "./firebase/initApp";
//import { modalReducer, alertReducer, tagsReducer } from "./../../src/store";
//import { photoReducer, searchReducer } from "./../../src/photos";
import { authReducer, useAuth } from "./../../src/auth";
import { addPhotoAC, usePhotos } from "./../../src/photos/loadPhotos";
import { tagsReducer } from "./../../src/tags";
import { searchReducer } from "./../../src/search";
import photoReducer from "./../../src/photos/loadPhotos/store/reducer";
import { alertReducer } from "./../../src/alert";
import addEditReducer from "./../../src/photos/addEditPhoto/store/reducer";
import favoriteReducer from "./../../src/photos/favorite/store/reducer";
import photoSliderReducer from "./../../src/photos/photoSlider/store/reducer";
import { showPhotoSliderAC } from "./../../src/photos/photoSlider/store/action";
import { PhotoSliderProvider } from "./../../src/photos/photoSlider/container/PhotoSlider/PhotoSlider.provider";
import { GlobalState } from "../../src/types";
import Box from "@mui/system/Box";
import {
  editPhotoRequestSendAC,
  editPhotoRequestSuccessAC,
  addPhotoRequestSendAC,
  addPhotoRequestSuccessAC,
} from "../../src/photos/addEditPhoto";
import Button from "@mui/material/Button";
import wait from "waait";

//CONFIG REDUX
const reducer = combineReducers({
  //modal: modalReducer,
  alert: alertReducer,
  auth: authReducer,
  tags: tagsReducer,
  search: searchReducer,
  loadPhotos: photoReducer,
  addEditPhoto: addEditReducer,
  favorite: favoriteReducer,
  photoSlider: photoSliderReducer,
});

const composeEnhancers = compose;

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = (store) => (next) => (action) => {
  console.group(action.type);
  console.info("DISPATCHING");
  console.info("ACTION", action);
  console.info("PREV STORE", store.getState());
  let result = next(action);
  console.log("NEW STORE", store.getState());
  console.groupEnd();
  return result;
};

const middleware = [thunk, logger]; //sagaMiddleware, thunk

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleware))
);

const Layout = ({ children }) => {
  const dispatch = useDispatch();

  const { photos, loading, error } = usePhotos();

  const activePhotoIndex = useSelector(
    (state) => state.photoSlider.activePhotoIndex
  );

  const { user } = useAuth();

  useEffect(() => {
    dispatch(showPhotoSliderAC(1));

    dispatch({
      type: "AUTH",
      user: {
        uid: "jkFrANbtA4bBEjFsvWWbSOPdt56yt",
        name: "blue",
        email: "wer@mail.ru",
        isEditor: true,
      },
    });
  }, []);

  const editPhoto = async () => {
    dispatch(editPhotoRequestSendAC("1532390460203"));

    await wait(3000);

    dispatch(editPhotoRequestSuccessAC("1532390460203"));
  };

  const addPhoto = async () => {
    const photoToAdd = photos[3];

    photoToAdd.id = "1531699239111";

    dispatch(addPhotoRequestSendAC());

    await wait(3000);

    batch(() => {
      dispatch(addPhotoRequestSuccessAC());

      dispatch(addPhotoAC(photoToAdd));
    });
  };

  return (
    <>
      <Box className="p-2 w-14 text-center border-b-2">
        <Button onClick={editPhoto}>edit photo</Button>
        <span> | </span>
        <Button onClick={addPhoto}>add photo</Button>- Photos -{" "}
        {photos === undefined
          ? "undefined"
          : loading === true
          ? "loading"
          : photos.length}{" "}
        | - User -{" "}
        {user === undefined ? "undefined" : `${user.name} - ${user.uid}`} | -
        activePhotoIndex - {activePhotoIndex}
      </Box>
      {photos !== undefined && (
        <PhotoSliderProvider>{children}</PhotoSliderProvider>
      )}
    </>
  );
};

export default (storyFn) => {
  return (
    <ReduxProvider store={store}>
      <Layout>{storyFn()}</Layout>
    </ReduxProvider>
  );
};
