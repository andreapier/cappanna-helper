import React from "react";
import ConnectedHeader from "containers/Orders/New/ConnectedHeader";
import ConnectedBody from "containers/Orders/New/ConnectedBody";

const NewOrderPage = ({ ...props }) => {
  return (
    <div>
      <ConnectedHeader />
      <ConnectedBody />
    </div>
  );
};

export default NewOrderPage;
