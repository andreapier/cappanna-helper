import React from "react";
import ConnectedHeader from "containers/Users/List/ConnectedHeader";
import ConnectedUsersList from "containers/Users/List/ConnectedUsersList";

const UserList = () => {
  return (
    <div>
      <ConnectedHeader />
      <ConnectedUsersList />
    </div>
  );
};

export default UserList;
