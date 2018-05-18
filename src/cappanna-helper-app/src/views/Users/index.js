import React from "react";
import { Grid } from "@material-ui/core";
import { RegularCard, ItemGrid } from "components";
import SignUpForm from "containers/SignUpForm";

function Users({ ...props }) {
  return (
    <Grid container>
      <ItemGrid xs={12} sm={12} md={8}>
        <RegularCard
          cardTitle="Crea utente"
          cardSubtitle="Inserisci i dati per creare un nuovo utente"
          content={<SignUpForm />}
        />
      </ItemGrid>
    </Grid>
  );
}

export default Users;
