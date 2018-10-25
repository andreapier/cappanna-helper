import React, {lazy, Suspense} from 'react';
import WaitLoader from "components/WaitDialog/WaitLoader";

const Order = lazy(() => import("views/Order"));
const AsyncOrder = () => {
  return (
    <Suspense fallback={<WaitLoader />}>
      <Order />
    </Suspense>
  );
};

export default AsyncOrder;
