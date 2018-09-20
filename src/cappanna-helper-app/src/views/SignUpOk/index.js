import React, {} from "react";
import Grid from "components/Grid";
import RegularCard from "components/Cards/RegularCard";
import ItemGrid from "components/Grid/ItemGrid";
import SignUpOk from "components/SignUpOk";
import { withRouter } from "react-router-dom";
import history from "./../../history";

const SignUpOkPage = () => {
  return (
    <RegularCard cardTitle="Registrazione completata">
      <Grid justify="center">
        <ItemGrid xs={12} sm={12} md={6}>
          <SignUpOk handleClick={() => history.push("/dasboard")} />
        </ItemGrid>
      </Grid>
    </RegularCard>
  );
}

export default withRouter(SignUpOkPage);
