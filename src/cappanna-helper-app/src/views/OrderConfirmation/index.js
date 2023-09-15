import React from "react";
import ConnectedHeader from "containers/Orders/New/Confirmation/ConnectedHeader";
import ConnectedMain from "containers/Orders/New/Confirmation/ConnectedMain";
import NotesForm from "containers/Orders/New/Confirmation/NotesForm";
import Footer from "components/Orders/New/Confirmation/Footer";

const OrderConfirmationPage = () => {
    return (
        <div>
            <ConnectedHeader />
            <ConnectedMain />
            <NotesForm />
            <Footer />
        </div>
    );
};

export default OrderConfirmationPage;
