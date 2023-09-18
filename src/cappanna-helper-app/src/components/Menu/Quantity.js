import React from "react";
import PropTypes from "prop-types";
import { MenuItem, Select, TextField } from "@mui/material";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";

const Quantity = (props) => {
    const unitsInStock = props.unitsInStock > 10 ? Infinity : props.unitsInStock > 0 ? 10 : 0;

    return (
        <Grid>
            <ItemGrid xs={unitsInStock === 10 ? 6 : 12}>
                <Select
                    variant="standard"
                    value={unitsInStock}
                    onChange={(e) => props.setMenuDetailQuantity(props.dishId, e.target.value)}
                    fullWidth
                    disabled={!props.setMenuDetailQuantity}>
                    <MenuItem value={Infinity}>Disponibile</MenuItem>
                    <MenuItem value={10}>Quasi finito</MenuItem>
                    <MenuItem value={0}>Terminato</MenuItem>
                </Select>
            </ItemGrid>
            {unitsInStock === 10 ? (
                <ItemGrid xs={6}>
                    <TextField
                        variant="standard"
                        label="N° piatti rimasti"
                        value={props.unitsInStock}
                        onChange={(e) => props.setMenuDetailQuantity(props.dishId, e.target.value)}
                        fullWidth
                        disabled={!props.setMenuDetailQuantity} />
                </ItemGrid>
            ) : null}
        </Grid>
    );
};

Quantity.propTypes = {
    dishId: PropTypes.number.isRequired,
    unitsInStock: PropTypes.number.isRequired,
    setMenuDetailQuantity: PropTypes.func
};

export default Quantity;
