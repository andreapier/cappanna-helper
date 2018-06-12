import React from "react";
import ConnectedHeader from "containers/Orders/List/ConnectedHeader";
import ConnectedOrdersList from "containers/Orders/List/ConnectedOrdersList";

const OrderList = () => {
  return (
    <div>
      <ConnectedHeader />
      <ConnectedOrdersList />
    </div>
  );
};

export default OrderList;
