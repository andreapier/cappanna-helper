import React from "react";
import { styled } from '@mui/material/styles';
import { defaultFont } from "variables/styles";
import { Typography } from "@mui/material";
import logo from "assets/img/logo.png";

const PREFIX = 'Logo';

const classes = {
    logo: `${PREFIX}-logo`,
    logoText: `${PREFIX}-logoText`,
    logoImage: `${PREFIX}-logoImage`,
    img: `${PREFIX}-img`
};

const Root = styled('div')({
    [`&.${classes.logo}`]: {
        position: "relative",
        padding: "0 5px"
    },
    [`& .${classes.logoText}`]: {
        ...defaultFont,
        textTransform: "uppercase",
        fontSize: "18px",
        textAlign: "right",
        lineHeight: "30px"
    },
    [`& .${classes.logoImage}`]: {
        width: "30px",
        display: "inline-block",
        maxHeight: "30px",
        marginLeft: "10px",
        marginRight: "15px"
    },
    [`& .${classes.img}`]: {
        width: "35px",
        position: "absolute",
        verticalAlign: "middle",
        border: "0"
    }
});

const Logo = () => {


    return (
        <Root className={classes.logo}>
            <div className={classes.logoImage}>
                <img src={logo} alt="logo" className={classes.img} />
            </div>
            <Typography className={classes.logoText}>Cappanna Helper</Typography>
        </Root>
    );
};

export default Logo;
