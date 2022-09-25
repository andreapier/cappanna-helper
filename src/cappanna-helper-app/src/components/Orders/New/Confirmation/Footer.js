import React from "react";
import { withStyles } from "@material-ui/core";
import PropTypes from "prop-types";
import Button from "components/CustomButtons";
import ActionDone from "@material-ui/icons/Done";
import Create from "@material-ui/icons/Create";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import { flex } from "variables/styles";

const Footer = props => {
  return (
    <Grid className={props.classes.root} justifyContent="space-between">
      <ItemGrid>
        <Button variant="contained" onClick={props.goBack}>
          <Create />
          Modifica
        </Button>
      </ItemGrid>
      <ItemGrid>
        <Button
          variant="contained"
          onClick={() => props.confirmOrder(props.order)}
          disabled={!props.canConfirm}
        >
          <ActionDone />
          Conferma
        </Button>
      </ItemGrid>
    </Grid>
  );
};

Footer.propTypes = {
  goBack: PropTypes.func.isRequired,
  confirmOrder: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  canConfirm: PropTypes.bool.isRequired
};

export default withStyles(flex)(Footer);
