import React from "react";
import Grid from "@material-ui/core/Grid";

const ContainerGrid = props => {
  const { children, ...rest } = props;

  return (
    <Grid container {...rest}>
      {children}
    </Grid>
  );
};

export default ContainerGrid;
