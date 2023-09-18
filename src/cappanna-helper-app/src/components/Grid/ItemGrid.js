import React from "react";
import { Grid } from "@mui/material";

const ItemGrid = (props) => {
    const { classes, children, ...rest } = props;

    return (
        <Grid item {...rest}>
            {children}
        </Grid>
    );
};

export default ItemGrid;
