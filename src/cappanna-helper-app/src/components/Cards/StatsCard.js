import React from "react";
import { styled } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { card, cardHeader, defaultFont, blueCardHeader, grayColor } from "variables/styles";

const PREFIX = 'StatsCard';

const classes = {
    card: `${PREFIX}-card`,
    cardHeader: `${PREFIX}-cardHeader`,
    blueCardHeader: `${PREFIX}-blueCardHeader`,
    cardContent: `${PREFIX}-cardContent`,
    cardIcon: `${PREFIX}-cardIcon`,
    cardAvatar: `${PREFIX}-cardAvatar`,
    cardCategory: `${PREFIX}-cardCategory`,
    cardTitle: `${PREFIX}-cardTitle`
};

const StyledCard = styled(Card)({
    [`&.${classes.card}`]: card,
    [`& .${classes.cardHeader}`]: {
        ...cardHeader,
        float: "left",
        textAlign: "center"
    },
    [`& .${classes.blueCardHeader}`]: blueCardHeader,
    [`& .${classes.cardContent}`]: {
        textAlign: "right",
        paddingTop: "10px",
        padding: "15px 20px"
    },
    [`& .${classes.cardIcon}`]: {
        width: "40px",
        height: "36px",
        fill: "#fff"
    },
    [`& .${classes.cardAvatar}`]: {
        margin: "8px"
    },
    [`& .${classes.cardCategory}`]: {
        marginBottom: "0",
        color: grayColor,
        margin: "0 0 10px",
        ...defaultFont
    },
    [`& .${classes.cardTitle}`]: {
        margin: "0",
        ...defaultFont,
        fontSize: "1.625em"
    }
});

const StatsCard = props => {
    const { title, description } = props;

    return (
        <StyledCard className={classes.card}>
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
        </StyledCard>
    );
};

StatsCard.propTypes = {
    icon: PropTypes.object.isRequired,
    title: PropTypes.node,
    description: PropTypes.node
};

export default StatsCard;
