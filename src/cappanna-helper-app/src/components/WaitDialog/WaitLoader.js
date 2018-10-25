import React from "react";
import WaitDialog from "components/WaitDialog";

const WaitLoader = () => {
  const waitDialogProps = {
    loading: true,
    message: "Attendere..."
  };

  return <WaitDialog {...waitDialogProps} />;
};

export default WaitLoader;
