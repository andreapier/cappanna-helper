import AsyncCalculator from "views/Calculator/AsyncCalculator";
import { Apps } from "@material-ui/icons";

const calculator = {
  subroutes: [
    {
      path: "/calc",
      sidebarName: "Calcolatrice1",
      icon: Apps,
      component: AsyncCalculator,
      name: "calculator1",
      headerTitle: "Calcolatrice1"
    },
    {
      path: "/calc",
      sidebarName: "Calcolatrice2",
      icon: Apps,
      component: AsyncCalculator,
      name: "calculator2",
      headerTitle: "Calcolatrice2"
    }
  ]
};

export default calculator;
