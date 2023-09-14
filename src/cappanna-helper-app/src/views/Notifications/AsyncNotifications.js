import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const Notifications = lazy(() => import("views/Notifications"));
const AsyncNotifications = () => {
    return (
        <Suspense fallback={<WaitLoader />}>
            <Notifications />
        </Suspense>
    );
};

export default AsyncNotifications;
