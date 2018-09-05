import React from "react";
import Grid from "@material-ui/core/Grid";

const ItemGrid = props => {
  const { classes, children, ...rest } = props;

  return (
    <Grid item {...rest}>
      {children}
    </Grid>
  );
};

export default ItemGrid;
