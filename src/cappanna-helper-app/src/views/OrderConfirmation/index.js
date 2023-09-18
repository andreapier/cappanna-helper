import React from "react";
import Header from "components/Orders/New/Confirmation/Header";
import Main from "components/Orders/New/Confirmation/Main";
import NotesForm from "components/Orders/New/Confirmation/NotesForm";
import Footer from "components/Orders/New/Confirmation/Footer";

const OrderConfirmationPage = () => {
    return (
        <div>
            <Header />
            <Main />
            <NotesForm />
            <Footer />
        </div>
    );
};

export default OrderConfirmationPage;
