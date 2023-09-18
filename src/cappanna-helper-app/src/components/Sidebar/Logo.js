import PropTypes from "prop-types";
import React from "react";
import logoStyle from "variables/styles/logoStyle";
import { Typography } from "@mui/material";
import { withStyles } from '@mui/styles';
import logo from "assets/img/logo.png";

const Logo = (props) => {
    return (
        <div className={props.classes.logo}>
            <div className={props.classes.logoImage}>
                <img src={logo} alt="logo" className={props.classes.img} />
            </div>
            <Typography className={props.classes.logoText}>Cappanna Helper</Typography>
        </div>
    );
};

Logo.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(logoStyle)(Logo);
