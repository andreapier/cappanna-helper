import React from "react";
import WaitDialog from "components/WaitDialog";
import NotificationSnackbar from "components/Snackbar/NotificationSnackbar";

const WaitLoader = props => {
  if (props.error) {
    const snackbarProps = {
      message: "Attendere..."
    };

    return <NotificationSnackbar {...snackbarProps} />;
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
