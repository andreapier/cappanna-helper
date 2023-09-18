import React from "react";
import logoStyle from "variables/styles/logoStyle";
import { Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import logo from "assets/img/logo.png";

const useStyles = makeStyles(logoStyle);

const Logo = () => {
    const classes = useStyles();

    return (
        <div className={classes.logo}>
            <div className={classes.logoImage}>
                <img src={logo} alt="logo" className={classes.img} />
            </div>
            <Typography className={classes.logoText}>Cappanna Helper</Typography>
        </div>
    );
};

export default Logo;
