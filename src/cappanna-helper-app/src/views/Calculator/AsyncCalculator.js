import React, {lazy, Suspense} from 'react';
import WaitLoader from "components/WaitDialog/WaitLoader";

const Calculator = lazy(() => import("views/Calculator"));
const AsyncCalculator = () => {
  return (
    <Suspense fallback={<WaitLoader />}>
      <Calculator />
    </Suspense>
  );
};

export default AsyncCalculator;
