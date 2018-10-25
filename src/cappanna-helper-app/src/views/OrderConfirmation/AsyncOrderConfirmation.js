import React, {lazy, Suspense} from 'react';
import WaitLoader from "components/WaitDialog/WaitLoader";

const OrderConfirmation = lazy(() => import("views/OrderConfirmation"));
const AsyncOrderConfirmation = () => {
  return (
    <Suspense fallback={<WaitLoader />}>
      <OrderConfirmation />
    </Suspense>
  );
};

export default AsyncOrderConfirmation;
