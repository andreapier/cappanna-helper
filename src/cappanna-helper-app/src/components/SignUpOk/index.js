import React from "react";
import P from "components/Typography/P";
import Button from "components/CustomButtons";
import Grid from "@material-ui/core/Grid";
import ItemGrid from "components/Grid/ItemGrid";

const SignUpOk = props => {
  return (
    <Grid container justify="space-between">
      <ItemGrid xs={12}>
        <P key={1}>Registrazione eseguita con successo!</P>
      </ItemGrid>
      <ItemGrid xs={12}>
        <P key={2}>Stai al top!</P>
      </ItemGrid>
      <ItemGrid xs={12} md={3}>
        <Button fullWidth onClick={props.handleClick}>
          Ok
        </Button>
      </ItemGrid>
    </Grid>
  );
};

export default SignUpOk;
