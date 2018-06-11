import React from "react";
import { Grid } from "@material-ui/core";
import { RegularCard, ItemGrid } from "components";
import SignUpOk from "components/SignUpOk";
import { withRouter } from "react-router-dom";

class SignUpOkPage extends React.Component {
  render() {
    return (
      <RegularCard
        cardTitle="Registrazione completata"
        content={
          <Grid container justify="center">
            <ItemGrid xs={12} sm={12} md={6}>
              <SignUpOk
                handleClick={() => this.props.history.push("/dasboard")}
              />
            </ItemGrid>
          </Grid>
        }
      />
    );
  }
}

export default withRouter(SignUpOkPage);
