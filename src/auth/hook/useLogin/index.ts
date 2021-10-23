import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../service/AuthService";
import {
  //loginRequestSuccessAC,
  loginRequestErrorAC,
  loginRequestAC,
} from "../../store/action";
import { then, _catch, _finally, compose, elif } from "fmagic";

export let isRequested = false;

export const setIsRequested = (val: boolean) => (isRequested = val);
export const getIsRequested = () => isRequested;

export const request_ =
  (
    loginRequestAC: () => void,
    loginRequestErrorAC: () => void,
    setIsRequested: (val: boolean) => void,
    getIsRequested: () => boolean,
    login: () => Promise<boolean>
  ) =>
  (dispatch: any) =>
    elif(
      () => getIsRequested() === false,
      compose(
        () => dispatch(loginRequestAC()),
        () => setIsRequested(true),
        login,
        _catch((err) => {
          console.error(err);
          dispatch(loginRequestErrorAC());
        }),
        _finally(() => setIsRequested(false))
      ),
      () => {}
    );

export const request = request_(
  loginRequestAC,
  loginRequestErrorAC,
  setIsRequested,
  getIsRequested,
  login
);

/* export const irequest = (dispatch: any) =>
  cond<undefined, any>([
    [
      () => isRequested === false,
      flow(
        () => {
          dispatch(loginRequestAC()), (isRequested = true);
        },
        login,
        //then(() => dispatch(loginRequestSuccessAC())),
        _catch((err) => {
          console.error(err);
          dispatch(loginRequestErrorAC());
        }),
        _finally(() => (isRequested = false))
      ),
    ],
  ]); */

export const useLogin = () => {
  const dispatch = useDispatch();

  const startNew = useCallback(request(dispatch), []);

  return {
    login: startNew,
  };
};
