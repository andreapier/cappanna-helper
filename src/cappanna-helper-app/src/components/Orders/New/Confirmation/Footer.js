import React from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Button from "components/CustomButtons";
import ActionDone from "@material-ui/icons/Done";
import Create from "@material-ui/icons/Create";
import ContainerGrid from "components/Grid/ContainerGrid";
import ItemGrid from "components/Grid/ItemGrid";
import { flex } from "variables/styles";

const styles = {
  root: {
    ...flex.root,
    justifyContent: "space-between"
  }
};

const Footer = props => {
  return (
    <ContainerGrid className={props.classes.root}>
      <ItemGrid sx={12} md={6}>
        <Button variant="raised" onClick={props.goBack}>
          <Create />
          Modifica
        </Button>
      </ItemGrid>
      <ItemGrid sx={12} md={6}>
        <Button
          variant="raised"
          onClick={() => props.confirmOrder(props.order, props.userId)}
        >
          <ActionDone />
          Conferma
        </Button>
      </ItemGrid>
    </ContainerGrid>
  );
};

Footer.propTypes = {
  goBack: PropTypes.func.isRequired,
  confirmOrder: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  userId: PropTypes.number.isRequired
};

export default withStyles(styles)(Footer);
