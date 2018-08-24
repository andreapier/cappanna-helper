import React from "react";
import Grid from "components/Grid";
import RegularCard from "components/Cards/RegularCard";
import ItemGrid from "components/Grid/ItemGrid";
import SignUpOk from "components/SignUpOk";
import { withRouter } from "react-router-dom";

class SignUpOkPage extends React.Component {
  render() {
    return (
      <RegularCard cardTitle="Registrazione completata">
        <Grid justify="center">
          <ItemGrid xs={12} sm={12} md={6}>
            <SignUpOk handleClick={() => this.props.history.push("/dasboard")} />
          </ItemGrid>
        </Grid>
      </RegularCard>
    );
  }
}

export default withRouter(SignUpOkPage);
