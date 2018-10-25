import React, {lazy, Suspense} from 'react';
import WaitLoader from "components/WaitDialog/WaitLoader";

const OrderList = lazy(() => import("views/OrderList"));
const AsyncOrderList = () => {
  return (
    <Suspense fallback={<WaitLoader />}>
      <OrderList />
    </Suspense>
  );
};

export default AsyncOrderList;

