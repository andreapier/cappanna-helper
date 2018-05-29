import React from "react";
import ConnectedHeader from "containers/Orders/Confirmation/ConnectedHeader";
import ConnectedMain from "containers/Orders/Confirmation/ConnectedMain";
import NotesForm from "containers/Orders/Confirmation/NotesForm";
import ConnectedFooter from "containers/Orders/Confirmation/ConnectedFooter";

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
