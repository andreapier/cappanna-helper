import React, { Component } from "react";
import Grid from "components/Grid";
import RegularCard from "components/Cards/RegularCard";
import P from "components/Typography/P";
import ItemGrid from "components/Grid/ItemGrid";
import SignInForm from "containers/SignInForm";

class SignInPage extends Component {
  render() {
    return (
      <RegularCard
        cardTitle="Sign in"
        cardSubtitle={
          <P>Inserisci le credenziali per iniziare ad utilizzare il sistema</P>
        }>
          <Grid justify="center">
            <ItemGrid xs={12} sm={12} md={6}>
              <SignInForm />
            </ItemGrid>
          </Grid>
      </RegularCard>
    );
  }
}

export default SignInPage;
