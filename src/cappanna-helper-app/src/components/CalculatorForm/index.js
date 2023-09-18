import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { makeStyles } from '@mui/styles';
import { calculate } from "actions";
import Button from "components/CustomButtons";
import ItemGrid from "components/Grid/ItemGrid";
import Grid from "components/Grid";

const useStyles = makeStyles({
    buttonContainer: {
        paddingTop: "40px",
        paddingBottom: "40px"
    }
});

const Calculator = () => {
    const classes = useStyles();
    const calculator = useSelector(state => state.calculator);
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(calculator.amount);
    const [paidAmount, setPaidAmount] = useState(calculator.paidAmount);
    const [seats, setSeats] = useState(calculator.seats);

    const handleSetAmount = (event) => setAmount(parseFloat(event.target.value));
    const handleSetPaidAmount = (event) => setPaidAmount(parseFloat(event.target.value));
    const handleSetSeats = (event) => setSeats(parseFloat(event.target.value));
    const handleSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();
    
        dispatch(calculate({ amount, paidAmount, seats }));
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid>
                <ItemGrid xs={12} md={4}>
                    <TextField
                        variant="standard"
                        name="amount"
                        autoFocus
                        fullWidth
                        label="Da pagare"
                        type="number"
                        onChange={handleSetAmount}
                        value={amount} />
                </ItemGrid>
                <ItemGrid xs={12} md={4}>
                    <TextField
                        variant="standard"
                        name="paidAmount"
                        fullWidth
                        label="Pagato"
                        type="number"
                        onChange={handleSetPaidAmount}
                        value={paidAmount} />
                </ItemGrid>
                <ItemGrid xs={12} md={4}>
                    <TextField
                        variant="standard"
                        name="seats"
                        fullWidth
                        label="Coperti"
                        type="number"
                        onChange={handleSetSeats}
                        value={seats} />
                </ItemGrid>
                <ItemGrid xs={12} className={classes.buttonContainer}>
                    <Button type="submit" fullWidth>
                        Calcola
                    </Button>
                </ItemGrid>
                <ItemGrid xs={12} md={6}>
                    <TextField
                        variant="standard"
                        name="perPersonAmount"
                        fullWidth
                        label="Da pagare a persona"
                        type="number"
                        readOnly
                        value={calculator.perPersonAmount} />
                </ItemGrid>
                <ItemGrid xs={12} md={6}>
                    <TextField
                        variant="standard"
                        name="chChange"
                        fullWidth
                        label="Resto"
                        type="number"
                        readOnly
                        value={calculator.change} />
                </ItemGrid>
            </Grid>
        </form>
    );
}

export default Calculator;
