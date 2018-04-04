import React from "react";
import { Grid } from "material-ui";
import {
  RegularCard,
  P,
  ItemGrid
} from "components";
import SignInForm from './../../containers/SignInForm';

class SignIn extends React.Component {
  render() {
    return (
      <RegularCard
          cardTitle="Sign in"
          cardSubtitle={
          <P>
            Inserisci le credenziali per iniziare ad utilizzare il sistema
          </P>
        }
          content={
          <Grid container justify="center">
            <ItemGrid xs={12} sm={12} md={6}>
              <SignInForm />
            </ItemGrid>
          </Grid>
        }
      />
    );
  }
}

export default SignIn;
