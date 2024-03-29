import React from "react";
//import classes from './SearchPhotoForm.module.scss';
//import { makeStyles } from "@material-ui/core/styles";
import { useSearchPhotoForm } from "./../../hook/useSearchPhotoForm";
//import { fromFormDataToState } from "./helper";
import SearchPhotoForm from "./SearchPhotoForm";
import FormModal from "./../../../component/FormModal";

export const ModalSearchPhotoForm = ({ isShow }: { isShow: boolean }) => {
  //close form on set state
  const props = useSearchPhotoForm();

  return (
    <FormModal open={isShow} onClose={props.onClose}>
      <SearchPhotoForm {...props} />
    </FormModal>
  );
};

export default ModalSearchPhotoForm;
