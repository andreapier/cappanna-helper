import React from "react";
import { styled } from '@mui/material/styles';
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { makeSelectMenuItemsByGroup } from "selectors";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MenuItemDetail from "components/Orders/New/MenuItemDetail";

const PREFIX = 'DishList';

const classes = {
    expansion: `${PREFIX}-expansion`
};

const StyledAccordion = styled(Accordion)({
    [`& .${classes.expansion}`]: {
        padding: "8px 2px",
        display: "block"
    }
});

const DishList = (props) => {
    const selectMenuItemsByGroup = makeSelectMenuItemsByGroup();
    const menuItemDetails = useSelector(state => selectMenuItemsByGroup(state, props.group));
    const handleSetExpanded = () => props.onExpandedChange(props.group);

    return (
        <StyledAccordion expanded={props.expanded} onChange={handleSetExpanded}>
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
        </StyledAccordion>
    );
};

DishList.propTypes = {
    group: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    onExpandedChange: PropTypes.func.isRequired,
};

export default DishList;
