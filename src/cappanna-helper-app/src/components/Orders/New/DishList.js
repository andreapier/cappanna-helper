import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeSelectMenuItemsByGroup } from "selectors";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { makeStyles } from '@mui/styles';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItemDetail from "components/Orders/New/MenuItemDetail";

const useStyles = makeStyles({
    expansion: {
        padding: "8px 2px",
        display: "block"
    }
});

const DishList = (props) => {
    const classes = useStyles();
    const selectMenuItemsByGroup = makeSelectMenuItemsByGroup();
    const menuItemDetails = useSelector(state => selectMenuItemsByGroup(state, props.group));
    const handleSetExpanded = () => props.onExpandedChange(props.group);

    return (
            <Accordion expanded={props.expanded} onChange={handleSetExpanded}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>{props.title}</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.expansion}>
                    <div>
                        {menuItemDetails.map((i) => (
                            <MenuItemDetail key={i.id} detail={i} />
                        ))}
                    </div>
                </AccordionDetails>
            </Accordion>
    );
};

DishList.propTypes = {
    group: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    onExpandedChange: PropTypes.func.isRequired,
};

export default DishList;
