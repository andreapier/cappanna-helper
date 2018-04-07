import React from "react";
import { Grid } from "material-ui";
import {
  RegularCard,
  ItemGrid
} from "components";
import SignUpOk from 'components/SignUpOk';
import history from './../../history';

class SignUpOkPage extends React.Component {
  render() {
    return (
      <RegularCard
          cardTitle="Registrazione completata"
          content={
          <Grid container justify="center">
            <ItemGrid xs={12} sm={12} md={6}>
              <SignUpOk handleClick={()=> history.push('/dasboard')} />
            </ItemGrid>
          </Grid>
        }
      />
    );
  }
}

export default SignUpOkPage;
