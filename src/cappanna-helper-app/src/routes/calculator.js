import AsyncCalculator from "views/Calculator/AsyncCalculator";
import Apps from "@mui/icons-material/Apps";

const calculator = {
    path: "/calc",
    sidebarName: "Calcolatrice",
    icon: Apps,
    component: AsyncCalculator,
    name: "calculator",
    headerTitle: "Calcolatrice"
};

export default calculator;
