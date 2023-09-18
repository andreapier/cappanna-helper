import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const SignIn = lazy(() => import("views/SignIn"));
const AsyncSignIn = () => {
    return (
        <Suspense fallback={<WaitLoader />}>
            <SignIn />
        </Suspense>
    );
};

export default AsyncSignIn;
