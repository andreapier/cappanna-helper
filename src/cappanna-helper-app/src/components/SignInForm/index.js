import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signinRequested } from "actions";
import Button from "components/CustomButtons";
import ItemGrid from "components/Grid/ItemGrid";
import Grid from "components/Grid";
import { Checkbox, FormControlLabel, TextField } from "@material-ui/core";
import { getDefaultRoute } from "routes/helpers";

const SignInForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);

    const setUsernameCallback = event => setUsername(event.target.value);
    const setPasswordCallback = event => setPassword(event.target.value);
    const setRememberMeCallback = event => setRememberMe(event.target.checked);

    const token = useSelector(state => state.user.token);
    const roles = useSelector(state => state.user.roles);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.stopPropagation();
        event.preventDefault();

        dispatch(signinRequested({ username, password, rememberMe }));
    }

    useEffect(() => {
        if (token) {
            navigate(getDefaultRoute(roles[0]));
        }
    }, [navigate, roles, token]);

    return (
        <form onSubmit={handleSubmit}>
            <Grid justifyContent="space-between">
                <ItemGrid xs={12}>
                    <TextField name="username" autoFocus fullWidth label="Username" value={username} onChange={setUsernameCallback} />
                </ItemGrid>

                <ItemGrid xs={12}>
                    <TextField name="password" type="password" fullWidth label="Password" value={password} onChange={setPasswordCallback} />
                </ItemGrid>

                <ItemGrid xs={12} md={3}>
                    <FormControlLabel
                        control={<Checkbox color="primary" checked={rememberMe} onChange={setRememberMeCallback} />}
                        label="Ricordami"
                    />
                </ItemGrid>

                <ItemGrid xs={12} md={3}>
                    <Button type="submit" fullWidth>
                        Entra
                    </Button>
                </ItemGrid>
            </Grid>
        </form>
    );
}

export default SignInForm;
