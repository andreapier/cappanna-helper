import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const SignOut = lazy(() => import("views/SignOut"));
const AsyncSignOut = () => {
    return (
        <Suspense fallback={<WaitLoader />}>
            <SignOut />
        </Suspense>
    );
};

export default AsyncSignOut;
