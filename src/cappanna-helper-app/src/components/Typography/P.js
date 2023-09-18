import React from "react";
import { makeStyles } from '@mui/styles';
import typographyStyle from "variables/styles/typographyStyle";

const useStyles = makeStyles(typographyStyle);

const P = ({ children }) => {
    const classes = useStyles();
    
    return <p className={classes.defaultFontStyle + " " + classes.pStyle}>{children}</p>;
}

export default P;
