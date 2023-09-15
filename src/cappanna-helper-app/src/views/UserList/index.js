import React from "react";
import Header from "components/Users/List/Header";
import ConnectedUsersList from "containers/Users/List/ConnectedUsersList";

const UserList = () => {
    return (
        <div>
            <Header />
            <ConnectedUsersList />
        </div>
    );
};

export default UserList;
