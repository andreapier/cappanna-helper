import React from "react";
import Header from "components/Orders/List/Header";
import ConnectedOrdersList from "containers/Orders/List/ConnectedOrdersList";

const OrderList = () => {
    return (
        <div>
            <Header />
            <ConnectedOrdersList />
        </div>
    );
};

export default OrderList;
