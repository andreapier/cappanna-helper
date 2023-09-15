import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, withStyles } from "@material-ui/core";
import { calculate } from "actions";
import Button from "components/CustomButtons";
import ItemGrid from "components/Grid/ItemGrid";
import Grid from "components/Grid";
import { formatAmount } from "utils/string";

const style = {
    buttonContainer: {
        paddingTop: "40px",
        paddingBottom: "40px"
    }
};

const Calculator = (props) => {
    const calculator = useSelector(state => state.calculator);
    const dispatch = useDispatch();

    const [amount, setAmount] = useState(calculator.amount);
    const [paidAmount, setPaidAmount] = useState(calculator.calculatorPaidAmount);
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
                        name="amount"
                        autoFocus
                        fullWidth
                        label="Da pagare"
                        type="number"
                        onChange={handleSetAmount}
                        value={amount}
                    />
                </ItemGrid>
                <ItemGrid xs={12} md={4}>
                    <TextField
                        name="paidAmount"
                        fullWidth
                        label="Pagato"
                        type="number"
                        onChange={handleSetPaidAmount}
                        value={paidAmount}
                    />
                </ItemGrid>
                <ItemGrid xs={12} md={4}>
                    <TextField name="seats" fullWidth label="Coperti" type="number" onChange={handleSetSeats} value={seats} />
                </ItemGrid>
                <ItemGrid xs={12} className={props.classes.buttonContainer}>
                    <Button type="submit" fullWidth>
                        Calcola
                    </Button>
                </ItemGrid>
                <ItemGrid xs={12} md={6}>
                    <TextField
                        name="perPersonAmount"
                        fullWidth
                        label="Da pagare a persona"
                        type="number"
                        readOnly
                        value={calculator.perPersonAmount}
                        normalize={formatAmount}
                    />
                </ItemGrid>
                <ItemGrid xs={12} md={6}>
                    <TextField name="chChange" fullWidth label="Resto" type="number" readOnly value={calculator.change} normalize={formatAmount} />
                </ItemGrid>
            </Grid>
        </form>
    );
}

export default withStyles(style)(Calculator);
