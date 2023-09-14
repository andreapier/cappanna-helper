import AsyncCalculator from "views/Calculator/AsyncCalculator";
import Apps from "@material-ui/icons/Apps";

const calculator = {
    path: "/calc",
    sidebarName: "Calcolatrice",
    icon: Apps,
    component: AsyncCalculator,
    name: "calculator",
    headerTitle: "Calcolatrice"
};

export default calculator;
