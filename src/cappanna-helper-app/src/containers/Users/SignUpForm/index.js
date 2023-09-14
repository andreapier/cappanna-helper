import React, { Component } from "react";
import PropTypes from "prop-types";
import Button from "components/CustomButtons";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { signupRequested } from "actions";
import { connect } from "react-redux";
import Grid from "components/Grid";
import ItemGrid from "components/Grid/ItemGrid";
import { loadStandsListRequested } from "actions";

class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            firstName: "",
            lastName: "",
            standId: 1
        };

        this.setUsername = this.setUsername.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.setConfirmPassword = this.setConfirmPassword.bind(this);
        this.setFirstName = this.setFirstName.bind(this);
        this.setLastName = this.setLastName.bind(this);
        this.setStand = this.setStand.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setUsername(event) {
        this.setState({ username: event.target.value });
    }

    setPassword(event) {
        this.setState({ password: event.target.value });
    }

    setConfirmPassword(event) {
        this.setState({ confirmPassword: event.target.value });
    }

    setFirstName(event) {
        this.setState({ firstName: event.target.value });
    }

    setLastName(event) {
        this.setState({ lastName: event.target.value });
    }

    setStand(event) {
        this.setState({ standId: event.target.value });
    }

    handleSubmit(event) {
        event.stopPropagation();
        event.preventDefault();

        this.props.signupRequested(this.state);
    }

    componentDidMount() {
        if (this.props.stands.length === 0) {
            this.props.loadStands();
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <Grid justifyContent="space-between">
                    <ItemGrid xs={12} md={6} lg={4}>
                        <TextField name="username" autoFocus fullWidth label="Username" value={this.state.username} onChange={this.setUsername} />
                    </ItemGrid>

                    <ItemGrid xs={12} md={6} lg={4}>
                        <TextField name="password" type="password" fullWidth label="Password" value={this.state.password} onChange={this.setPassword} />
                    </ItemGrid>

                    <ItemGrid xs={12} md={6} lg={4}>
                        <TextField
                            name="confirmPassword"
                            type="password"
                            fullWidth
                            label="Conferma password"
                            value={this.state.confirmPassword}
                            onChange={this.setConfirmPassword}
                        />
                    </ItemGrid>

                    <ItemGrid xs={12} md={6} lg={4}>
                        <TextField name="firstName" fullWidth label="Nome" value={this.state.firstName} onChange={this.setFirstName} />
                    </ItemGrid>

                    <ItemGrid xs={12} md={6} lg={4}>
                        <TextField name="lastName" fullWidth label="Cognome" value={this.state.lastName} onChange={this.setLastName} />
                    </ItemGrid>

                    <ItemGrid xs={12} md={6} lg={4}>
                        <FormControl fullWidth>
                            <InputLabel>Stand</InputLabel>
                            <Select value={this.state.standId} onChange={this.setStand}>
                                {this.props.stands.map((s) => (
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
}

SignUp.propTypes = {
    signupRequested: PropTypes.func.isRequired,
    loadStands: PropTypes.func.isRequired,
    stands: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return {
        stands: state.stands
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        signupRequested: (data) => dispatch(signupRequested(data)),
        loadStands: () => dispatch(loadStandsListRequested())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
