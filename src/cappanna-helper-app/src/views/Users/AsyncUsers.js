import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const Users = lazy(() => import("views/Users"));
const AsyncUsers = () => {
    return (
        <Suspense fallback={<WaitLoader />}>
            <Users />
        </Suspense>
    );
};

export default AsyncUsers;
