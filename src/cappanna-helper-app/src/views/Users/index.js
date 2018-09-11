import React from "react";
import RegularCard from "components/Cards/RegularCard";
import SignUpForm from "containers/SignUpForm";

const Users = () => {
  return (
    <RegularCard
      cardTitle="Crea utente"
      cardSubtitle="Inserisci i dati per creare un nuovo utente">
      <SignUpForm />
    </RegularCard>
  );
}

export default Users;
