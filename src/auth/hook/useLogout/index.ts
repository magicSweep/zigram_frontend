import { useCallback, useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import { logout } from "../../service/AuthService/index.fake";
import {
  //logoutRequestSuccessAC,
  logoutRequestErrorAC,
  logoutRequestAC,
} from "../../store";
import { elif, then, _catch, _finally, compose } from "fmagic";
import { removeUser } from "../../service/UserService/index.fake";
import { showAlertAC } from "../../../alert";

export let isRequested = false;

export const setIsRequested = (val: boolean) => (isRequested = val);
export const getIsRequested = () => isRequested;

export const request_ =
  (
    logoutRequestAC: () => void,
    logoutRequestErrorAC: () => void,
    setIsRequested: (val: boolean) => void,
    getIsRequested: () => boolean,
    logout: () => Promise<void>
  ) =>
  (dispatch: any) =>
    elif(
      () => getIsRequested() === false,
      compose(
        () => dispatch(logoutRequestAC()),
        () => setIsRequested(true),
        logout,
        then(removeUser),
        _catch((err) => {
          console.error(err);
          batch(() => {
            dispatch(
              showAlertAC({
                message: "Упс... Какая-то ошибочка...",
                alertType: "error",
              })
            );
            dispatch(logoutRequestErrorAC());
          });
        }),
        _finally(() => setIsRequested(false))
      ),
      () => {}
    );

export const request = request_(
  logoutRequestAC,
  logoutRequestErrorAC,
  setIsRequested,
  getIsRequested,
  logout
);

export const useLogout = () => {
  const dispatch = useDispatch();

  const startNew = useCallback(request(dispatch), []);

  return {
    logout: startNew,
  };
};
