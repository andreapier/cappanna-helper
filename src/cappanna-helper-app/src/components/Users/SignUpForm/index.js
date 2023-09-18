import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/CustomButtons";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { signupRequested } from "actions";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import { loadStandsListRequested } from "actions";

const SignUp = () => {
    const stands = useSelector(state => state.stands);
    const dispatch = useDispatch();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [standId, setStandId] = useState(1);

    const handleSetUsername = (event) => setUsername(event.target.value);
    const handleSetPassword = (event) => setPassword(event.target.value);
    const handleSetConfirmPassword = (event) => setConfirmPassword(event.target.value);
    const handleSetFirstName = (event) => setFirstName(event.target.value);
    const handleSetLastName = (event) => setLastName(event.target.value);
    const handleSetStandId = (event) => setStandId(event.target.value);
    const handleSubmit = (event) => {
        event.stopPropagation();
        event.preventDefault();
    
        dispatch(signupRequested({
            username,
            password,
            confirmPassword,
            firstName,
            lastName,
            standId
        }));
    };

    useEffect(() => {
        if (stands.length === 0) {
            dispatch(loadStandsListRequested());
        }
    }, [dispatch, stands]);

    return (
        <form onSubmit={handleSubmit}>
            <Grid justifyContent="space-between">
                <ItemGrid xs={12} md={6} lg={4}>
                    <TextField
                        variant="standard"
                        name="username"
                        autoFocus
                        fullWidth
                        label="Username"
                        value={username}
                        onChange={handleSetUsername} />
                </ItemGrid>

                <ItemGrid xs={12} md={6} lg={4}>
                    <TextField
                        variant="standard"
                        name="password"
                        type="password"
                        fullWidth
                        label="Password"
                        value={password}
                        onChange={handleSetPassword} />
                </ItemGrid>

                <ItemGrid xs={12} md={6} lg={4}>
                    <TextField
                        variant="standard"
                        name="confirmPassword"
                        type="password"
                        fullWidth
                        label="Conferma password"
                        value={confirmPassword}
                        onChange={handleSetConfirmPassword} />
                </ItemGrid>

                <ItemGrid xs={12} md={6} lg={4}>
                    <TextField
                        variant="standard"
                        name="firstName"
                        fullWidth
                        label="Nome"
                        value={firstName}
                        onChange={handleSetFirstName} />
                </ItemGrid>

                <ItemGrid xs={12} md={6} lg={4}>
                    <TextField
                        variant="standard"
                        name="lastName"
                        fullWidth
                        label="Cognome"
                        value={lastName}
                        onChange={handleSetLastName} />
                </ItemGrid>

                <ItemGrid xs={12} md={6} lg={4}>
                    <FormControl variant="standard" fullWidth>
                        <InputLabel>Stand</InputLabel>
                        <Select variant="standard" value={standId} onChange={handleSetStandId}>
                            {stands.map((s) => (
                                <MenuItem value={s.id} key={s.id}>
                                    {s.description}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </ItemGrid>

                <ItemGrid xs={12} md={3} lg={3}>
                    <Button type="submit" fullWidth>
                        Registra
                    </Button>
                </ItemGrid>
            </Grid>
        </form>
    );
}

export default SignUp;
