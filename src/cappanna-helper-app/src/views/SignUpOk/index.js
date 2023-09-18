import React from "react";
import Grid from "components/Grid";
import RegularCard from "components/Cards/RegularCard";
import ItemGrid from "components/Grid/ItemGrid";
import SignUpOk from "components/Users/SignUpOk";

const SignUpOkPage = () => {
    return (
        <RegularCard cardTitle="Registrazione completata">
            <Grid justifyContent="center">
                <ItemGrid xs={12} sm={12} md={6}>
                    <SignUpOk />
                </ItemGrid>
            </Grid>
        </RegularCard>
    );
};

export default SignUpOkPage;
