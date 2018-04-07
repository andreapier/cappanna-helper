import React from "react";
import { Grid } from "material-ui";
import {
  RegularCard,
  ItemGrid
} from "components";
import SignUpForm from 'containers/SignUpForm';

function Users({ ...props }) {
  return (
    <div>
      <Grid container>
        <ItemGrid xs={12} sm={12} md={8}>
          <RegularCard
              cardTitle="Crea utente"
              cardSubtitle="Inserisci i dati per creare un nuovo utente"
              content={
                <Grid container justify="center">
                <ItemGrid xs={12} sm={12} md={6}>
                  <SignUpForm />
                </ItemGrid>
              </Grid>
            }
          />
        </ItemGrid>
      </Grid>
    </div>
  );
}

export default Users;
