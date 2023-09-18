import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDefaultRoute } from "routes/helpers";
import P from "components/Typography/P";
import Button from "components/CustomButtons";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";

const SignUpOk = () => {
    const roles = useSelector(state => state.user.roles);
    const navigate = useNavigate();
    const handleClick = () => navigate(getDefaultRoute(roles[0]));

    return (
        <Grid justifyContent="space-between">
            <ItemGrid xs={12}>
                <P key={1}>Registrazione eseguita con successo!</P>
            </ItemGrid>
            <ItemGrid xs={12}>
                <P key={2}>Stai al top!</P>
            </ItemGrid>
            <ItemGrid xs={12} md={3}>
                <Button fullWidth onClick={handleClick}>
                    Ok
                </Button>
            </ItemGrid>
        </Grid>
    );
};

export default SignUpOk;
