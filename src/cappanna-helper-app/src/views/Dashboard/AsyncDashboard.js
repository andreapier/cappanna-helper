import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const Dashboard = lazy(() => import("views/Dashboard"));
const AsyncDashboard = () => {
    return (
        <Suspense fallback={<WaitLoader />}>
            <Dashboard />
        </Suspense>
    );
};

export default AsyncDashboard;
