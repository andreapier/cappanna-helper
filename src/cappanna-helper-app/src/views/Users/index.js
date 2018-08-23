import React from "react";
import RegularCard from "components/Cards/RegularCard";
import SignUpForm from "containers/SignUpForm";

function Users({ ...props }) {
  return (
    <RegularCard
      cardTitle="Crea utente"
      cardSubtitle="Inserisci i dati per creare un nuovo utente">
      <SignUpForm />
    </RegularCard>
  );
}

export default Users;
