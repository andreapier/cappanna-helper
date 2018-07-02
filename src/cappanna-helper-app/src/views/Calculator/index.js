import React from "react";
import Loadable from "react-loadable";
import WaitDialog from "components/WaitDialog";

const LoadableCalculatorPage = Loadable({
  loader: () => import("components/Calculator"),
  loading: WaitDialog,
  delay: 300
});

export default LoadableCalculatorPage;
