import { FC, useCallback, useEffect } from "react";
import TagCheckboxesWidget from "./TagCheckboxes";
import { UseFormTagCheckboxesProps, useFormTagsCheckboxes } from "./hook";

export const TagCheckboxes: FC<
  UseFormTagCheckboxesProps & { disabled: boolean }
> = ({ disabled, ...props }) => {
  const otherProps = useFormTagsCheckboxes(props);

  //console.log("[RENDER TAGS CHECKBOX] ");

  return <TagCheckboxesWidget disabled={disabled} {...otherProps} />;
};

export default TagCheckboxes;

/* export const TagCheckboxes: FC<TagCheckboxesProps> = ({ ...props }) => {
  const { tags, error, loading } = useTags();

  //loading, data, queryError, tagsState
  console.log("[RENDER TAGS CHECKBOX] ", tags, error, loading);

  return (
    <TagCheckboxesWidget
      tagsState={{ items: tags, error, loading }}
      {...props}
    />
  );
};

export default TagCheckboxes; */
