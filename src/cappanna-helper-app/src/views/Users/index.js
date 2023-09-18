import React from "react";
import RegularCard from "components/Cards/RegularCard";
import SignUpForm from "components/Users/SignUpForm";

const Users = () => {
    return (
        <RegularCard cardTitle="Crea utente" cardSubtitle="Inserisci i dati per creare un nuovo utente">
            <SignUpForm />
        </RegularCard>
    );
};

export default Users;
