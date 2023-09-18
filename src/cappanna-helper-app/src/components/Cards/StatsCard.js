import React from "react";
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import PropTypes from "prop-types";
import statsCardStyle from "variables/styles/statsCardStyle";

const useStyles = makeStyles(statsCardStyle);

const StatsCard = (props) => {
    const classes = useStyles();
    const { title, description } = props;

    return (
        <Card className={classes.card}>
            <CardHeader
                classes={{
                    root: classes.cardHeader + " " + classes.blueCardHeader,
                    avatar: classes.cardAvatar
                }}
                avatar={<props.icon className={classes.cardIcon} />}
            />
            <CardContent className={classes.cardContent}>
                <Typography component="p" className={classes.cardCategory}>
                    {title}
                </Typography>
                <Typography variant="h5" component="h2" className={classes.cardTitle}>
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
};

StatsCard.propTypes = {
    icon: PropTypes.object.isRequired,
    title: PropTypes.node,
    description: PropTypes.node
};

export default StatsCard;
