import React from "react";
import PropTypes from "prop-types";
import Preview from "components/Users/List/Preview";
import { List } from "@mui/material";

const UsersList = (props) => {
    return (
        <List>
            {props.users.map((u) => (
                <Preview user={u} key={u.id} />
            ))}
        </List>
    );
};

UsersList.propTypes = {
    users: PropTypes.array.isRequired
};

export default UsersList;
