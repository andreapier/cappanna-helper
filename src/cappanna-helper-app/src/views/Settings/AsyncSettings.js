import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const Settings = lazy(() => import("views/Settings"));
const AsyncSettings = () => {
    return (
        <Suspense fallback={<WaitLoader />}>
            <Settings />
        </Suspense>
    );
};

export default AsyncSettings;
