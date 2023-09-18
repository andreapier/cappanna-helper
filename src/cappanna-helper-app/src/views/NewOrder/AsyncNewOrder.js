import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const NewOrder = lazy(() => import("views/NewOrder"));
const AsyncNewOrder = () => {
    return (
        <Suspense fallback={<WaitLoader />}>
            <NewOrder />
        </Suspense>
    );
};

export default AsyncNewOrder;
