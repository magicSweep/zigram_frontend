import { compose, tap } from "fmagic";
/* import {
  FirestoreDate,
  Photo,
  WorkerRequest,
  WorkerResponse,
} from "lizzygram-common-data/dist/types"; */
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect as useEffect_,
  useRef,
  useState as useState_,
} from "react";
//import { useDispatch } from "react-redux";
import { useAuth as useAuth_ } from "../../../auth";
//import { SearchTerms } from "../../../search/types";
//import { EditPhotoFormData } from "../../types";
import { useSelfKill as useSelfKill_, UseSelfKillRefData } from "./hook";
//import { selfKillingChecker_, selfKilling__ } from "./helper";
//import { stackDepth } from "../../../utils/stackDepth";

/* type ReqStage =
  | "form"
  | "request"
  | "get_new_photo"
  | "finish_with_error"
  | "finish_with_success"; */

export type PhotoReqState = {
  showForm: boolean;
  formWasClosed: boolean;
  uploadLoading: boolean;
  isFormSubmited: boolean;
  //end: false,
  isEndReq: boolean;
};

type UsePhotoRequestProps = {
  //state: PhotoReqState;
  //setState: Dispatch<SetStateAction<PhotoReqState>>,
  removeRequest: () => void;
};

type UsePhotoRequestData = { userUid: string } & {
  removeRequest: () => void;
  state: PhotoReqState;
  setState: Dispatch<SetStateAction<PhotoReqState>>;
  onFormClose: () => void;
};

export const usePhotoReq_ = (
  useAuth: typeof useAuth_,
  useState: typeof useState_,
  useEffect: typeof useEffect_,
  useSelfKill: typeof useSelfKill_
) =>
  compose<UsePhotoRequestProps, UsePhotoRequestData>(
    // GET USER UID
    (props: UsePhotoRequestProps) => {
      const { userUid } = useAuth();
      return {
        ...props,
        userUid,
      };
    },
    // INITIALIZE STATE
    (data: UsePhotoRequestData) => {
      const [state, setState] = useState({
        showForm: false,
        formWasClosed: false,
        uploadLoading: false,
        isFormSubmited: false,
        //end
        isEndReq: false,
      });
      data.state = state;
      data.setState = setState;

      return data;
    },
    // SET ON FORM CLOSE METHOD
    (data: UsePhotoRequestData) => ({
      ...data,
      onFormClose: () =>
        data.setState((prevState) => ({
          ...prevState,
          showForm: false,
          formWasClosed: true,
        })),
    }),
    // SHOW PHOTO FORM ON CREATE REQUEST
    tap(({ setState }: UsePhotoRequestData) => {
      useEffect(() => {
        setState((state) => ({
          ...state,
          showForm: true,
        }));
      }, []);
    }),
    //tap(stackDepth),
    // USE SELF KILL HOOK
    tap(({ removeRequest, state }: UsePhotoRequestData) =>
      useSelfKill({ state, removeRequest })
    )
  );

export const usePhotoReq = usePhotoReq_(
  useAuth_,
  useState_,
  useEffect_,
  useSelfKill_
);

/* export const usePhotoReq = (
  //id: string,
  removeRequest: (dispatch: any) => void,
  showForm: boolean,
  formWasClosed: boolean,
  isEndReq: boolean,
  isSubmited: boolean,
  set
  //getIsSubmitted: () => boolean
) => {
  const { userUid } = useAuth();

  // Show photo form on create request
  useEffect(() => {
    setState({
      ...state,
      showForm: true,
    });
  }, []);


}
 */
/* export const usePhotoReq = (
  id: string,
  removeRequest: (dispatch: any) => void,
  getIsSubmitted: () => boolean
) => {
  /* const mainRef = useRef<any>({
    //isSubmited: false,
    //formData: {},
    isSelfKilling: false,
    timerId: null,
  }); */

/* const setIsSubmited = (isSubmited: boolean) =>
    (mainRef.current.isSubmited = isSubmited); /

  const [state, setState] = useState({
    showForm: false,
    formWasClosed: false,
    uploadLoading: false,
    end: false,
    //successReq: false,
    //errorReq: "",
  });

  //const dispatch = useDispatch();

  const { userUid } = useAuth();
  /* const userUid = useSelector((state: any) =>
    state.auth.user ? state.auth.user.uid : ""
  ); */
//const userUid = "userUid";

/*   const searchState = useSelector<GlobalState, ISearchState>(
      (state) => state.search
    ); /

  const endReq = () =>
    setState((prevState: any) => ({
      ...prevState,
      end: true,
    }));

  const successEndReq = () =>
    setState((prevState: any) => ({
      ...prevState,
      //successReq: true,
      //errorReq: "",
      uploadLoading: false,
      showForm: false,
      formWasClosed: true,
    }));

  const errorEndReq = () =>
    setState((prevState: any) => ({
      ...prevState,
      uploadLoading: false,
      end: true,
      //errorReq: error.msg ? error.msg : JSON.stringify(error),
    }));

  const setUploadLoading = (uploadLoading: boolean) =>
    setState((prevState) => ({
      ...prevState,
      uploadLoading,
    }));

  const onFormClose = () => {
    ///console.log("ON FORM CLOSE");
    setState((prevState) => ({
      ...prevState,
      showForm: false,
      formWasClosed: true,
    }));
  };

  /* const onSelfKilling = () => {
    //console.log("onSelfKilling", mainRef);
    mainRef.current.isSelfKilling = true;

    mainRef.current.timerId = setTimeout(() => {
      removeRequest(dispatch);
    }, 1000);
  }; /

  // Show photo form on create request
  useEffect(() => {
    setState({
      ...state,
      showForm: true,
    });
  }, []);

  /*  // remove self
  useEffect(() => {
    // remove request if:
    // - it successfully done
    // - it has error and form already closed
    // - form closed without submit
    // - form closed and we get error

    if (mainRef.current.isSelfKilling === true) return;

    //if (state.successReq === true) onSelfKilling();

    if (state.showForm === false && state.formWasClosed === true) {
      if (mainRef.current.isSubmited === false) {
        onSelfKilling();
      }

      if (state.end === true) {
        onSelfKilling();
      }

      /* if (state.errorReq || state.successReq) {
        onSelfKilling();
      } */

/* if (state.errorReq || mainRef.current.isSubmited) {
          onSelfKilling();
        } /
    }

    return () => {
      if (mainRef.current.timerId) clearTimeout(mainRef.current.timerId);
    };
  }); /

  return {
    //setIsSubmited,
    onFormClose,
    //state,
    //setState,
    endReq,
    successEndReq,
    errorEndReq,
    setUploadLoading,
    showForm: state.showForm,
    uploadLoading: state.uploadLoading,
    userUid,
    //dispatch,
    //mainRef,
  };
};
 */
