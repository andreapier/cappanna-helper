import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrderNotes } from "actions";
import { TextField } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Notes = () => {
    const notes = useSelector(state => state.newOrderHeader.notes);
    const dispatch = useDispatch();
    const handleSetNotes = (event) => dispatch(setOrderNotes(event.target.value));

    return (
        <form>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Note</Typography>
                </AccordionSummary>

                <AccordionDetails>
                    <TextField
                        variant="standard"
                        name="notes"
                        label="Inserire le note dell'ordine"
                        multiline
                        minRows={4}
                        maxRows={10}
                        fullWidth
                        onChange={handleSetNotes}
                        value={notes} />
                </AccordionDetails>
            </Accordion>
        </form>
    );
}

export default Notes;
