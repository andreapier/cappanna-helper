import React, { lazy, Suspense } from "react";
import WaitLoader from "components/WaitDialog/WaitLoader";

const Menu = lazy(() => import("views/EditUser"));
const AsyncEditUser = () => {
  return (
    <Suspense fallback={<WaitLoader />}>
      <Menu />
    </Suspense>
  );
};

export default AsyncEditUser;
