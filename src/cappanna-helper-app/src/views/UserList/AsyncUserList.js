import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const UserList = lazy(() => import("views/UserList"));
const AsyncUserList = () => {
    return (
        <Suspense fallback={<WaitLoader />}>
            <UserList />
        </Suspense>
    );
};

export default AsyncUserList;
