import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const SignUpOk = lazy(() => import("views/SignUpOk"));
const AsyncSignUpOk = () => {
    return (
        <Suspense fallback={<WaitLoader />}>
            <SignUpOk />
        </Suspense>
    );
};

export default AsyncSignUpOk;
