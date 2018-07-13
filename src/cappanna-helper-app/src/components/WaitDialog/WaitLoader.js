import React from "react";
import WaitDialog from "components/WaitDialog";
import ErrorSnackbar from "components/Snackbar/ErrorSnackbar";

const WaitLoader = props => {
  if (props.error) {
    const errorSnackbarProps = {
      message: "Attendere..."
    };

    return <ErrorSnackbar {...errorSnackbarProps} />;
  } else if (props.pastDelay) {
    const waitDialogProps = {
      loading: true,
      message: "Attendere..."
    };

    return <WaitDialog {...waitDialogProps} />;
  } else if (props.timedOut) {
    return (
      <div>
        Taking a long time... <button onClick={props.retry}>Retry</button>
      </div>
    );
  } else {
    return null;
  }
};

export default WaitLoader;
