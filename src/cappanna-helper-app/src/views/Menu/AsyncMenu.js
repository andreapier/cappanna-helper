import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const Menu = lazy(() => import("views/Menu"));
const AsyncMenu = () => {
  return (
    <Suspense fallback={<WaitLoader />}>
      <Menu />
    </Suspense>
  );
};

export default AsyncMenu;
