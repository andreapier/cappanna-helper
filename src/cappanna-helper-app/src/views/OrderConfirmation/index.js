import React from "react";
import ConnectedHeader from "containers/Orders/New/Confirmation/ConnectedHeader";
import ConnectedMain from "containers/Orders/New/Confirmation/ConnectedMain";
import NotesForm from "containers/Orders/New/Confirmation/NotesForm";
import ConnectedFooter from "containers/Orders/New/Confirmation/ConnectedFooter";

const OrderConfirmationPage = () => {
  return (
    <div>
      <ConnectedHeader />
      <ConnectedMain />
      <NotesForm />
      <ConnectedFooter />
    </div>
  );
};

export default OrderConfirmationPage;
