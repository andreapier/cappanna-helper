import Loadable from "react-loadable";
import WaitLoader from "components/WaitDialog/WaitLoader";

const LoadablePage = loader =>
  Loadable({ loader, loading: WaitLoader, delay: 300 });

export default LoadablePage;
