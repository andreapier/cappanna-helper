import { defaultFont, flex } from "variables/styles";

const headerStyle = {
  appBar: {
    backgroundColor: "transparent",
    color: "#555555"
  },
  flex,
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px"
  }
};

export default headerStyle;
