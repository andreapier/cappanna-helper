import React, { Component } from "react";
import { connect } from "react-redux";
import { setOrderNotes } from "actions";
import { TextField } from "@material-ui/core";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PropTypes from "prop-types";

class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: props.amount,
            paidAmount: props.paidAmount,
            seats: props.seats
        };

        this.setNotes = this.setNotes.bind(this);
    }

    setNotes(event) {
        this.props.setNotes(event.target.value);
    }

    render() {
        return (
            <form>
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>Note</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        <TextField
                            name="notes"
                            label="Inserire le note dell'ordine"
                            multiline
                            minRows={4}
                            maxRows={10}
                            fullWidth
                            onChange={this.setNotes}
                            value={this.props.notes}
                        />
                    </AccordionDetails>
                </Accordion>
            </form>
        );
    }
}

Notes.propTypes = {
    notes: PropTypes.string.isRequired,
    setNotes: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        notes: state.newOrderHeader.notes
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setNotes: (value) => dispatch(setOrderNotes(value))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
