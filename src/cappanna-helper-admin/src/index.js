import React from "react";
import ReactDOM from "react-dom";
//import { Router, Route, Switch } from "react-router-dom";
import storeGenerator from "./store";
import "assets/css/index.css";
//import indexRoutes from "routes/index.jsx";
import App from "./containers/app/App";

const store = storeGenerator();

const renderApp = () => ReactDOM.render(<App store={store} />, document.getElementById("root"));

renderApp();

if (module.hot) {
  module.hot.accept("./containers/app/App", () => {
    renderApp();
  });
}

registerServiceWorker();


// ReactDOM.render(
//   <Router history={hist}>
//     <Switch>
//       {indexRoutes.map((prop, key) => {
//         return <Route path={prop.path} component={prop.component} key={key} />;
//       })}
//     </Switch>
//   </Router>,
//   document.getElementById("root")
// );