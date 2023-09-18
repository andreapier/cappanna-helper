import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const OrderDetailsAggregate = lazy(() => import("views/OrderDetailsAggregate"));
const AsyncOrderDetailsAggregate = () => {
    return (
        <Suspense fallback={<WaitLoader />}>
            <OrderDetailsAggregate />
        </Suspense>
    );
};

export default AsyncOrderDetailsAggregate;
