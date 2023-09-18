import React from "react";
import { Grid } from "@mui/material";

const ContainerGrid = (props) => {
    const { children, ...rest } = props;

    return (
        <Grid container {...rest}>
            {children}
        </Grid>
    );
};

export default ContainerGrid;
