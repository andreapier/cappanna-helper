import React from "react";
import { styled } from '@mui/material/styles';
import { defaultFont } from "variables/styles";

const PREFIX = 'P';

const classes = {
    defaultFontStyle: `${PREFIX}-defaultFontStyle`,
    pStyle: `${PREFIX}-pStyle`
};

const Root = styled('p')({
    [`& .${classes.defaultFontStyle}`]: {
        ...defaultFont,
        fontSize: "14px"
    },
    [`& .${classes.pStyle}`]: {
        margin: "0 0 10px"
    }
});

const P = ({ children }) => {

    
    return <Root className={classes.defaultFontStyle + " " + classes.pStyle}>{children}</Root>;
}

export default P;
