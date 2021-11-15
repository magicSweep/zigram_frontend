import { useState } from "react";
import AddPhotoForm from ".";

export default {
  component: AddPhotoForm,
  title: "Photos/Forms/AddPhotoForm",
};

export const Default = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    console.log("[SUBMIT]", data);

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="m-auto pt-8">
      <AddPhotoForm
        onSubmit={onSubmit}
        onClose={() => console.log("CLOSE")}
        uploadLoading={loading}
      />
    </div>
  );
};
