import React from "react";
import Grid from "@material-ui/core/Grid";
import RegularCard from "components/Cards/RegularCard";
import ItemGrid from "components/Grid/ItemGrid";
import SignOut from "containers/SignOut";

class SignOutPage extends React.Component {
  render() {
    return (
      <RegularCard
        cardTitle="Sign out"
        content={
          <Grid container justify="center">
            <ItemGrid xs={12} sm={12} md={6}>
              <SignOut />
            </ItemGrid>
          </Grid>
        }
      />
    );
  }
}

export default SignOutPage;
