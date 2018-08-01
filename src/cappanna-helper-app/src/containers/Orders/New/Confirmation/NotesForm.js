import React, { Component } from "react";
import { connect } from "react-redux";
import { setOrderNotes } from "actions";
import { TextField } from "redux-form-material-ui";
import { Field, reduxForm } from "redux-form";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import PropTypes from "prop-types";

class Notes extends Component {
  render() {
    return (
      <form>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Note</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Field
              component={TextField}
              name="notes"
              label="Inserire le note dell'ordine"
              multiline
              rows={4}
              rowsMax={10}
              fullWidth
              onBlur={this.props.setOrderNotes}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </form>
    );
  }
}

Notes.propTypes = {
  setOrderNotes: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    initialValues: { notes: state.newOrder.notes }
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setOrderNotes: e => dispatch(setOrderNotes(e.target.value))
  };
};

const NotesForm = reduxForm({
  form: "orderNotes",
  enableReinitialize: true
})(Notes);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NotesForm);
