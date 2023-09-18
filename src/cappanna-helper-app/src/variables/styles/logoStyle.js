import { defaultFont } from "variables/styles";

const logoStyle = (theme) => ({
    logo: {
        position: "relative",
        padding: "0 15px"
    },
    logoText: {
        ...defaultFont,
        textTransform: "uppercase",
        fontSize: "18px",
        textAlign: "right",
        lineHeight: "30px"
    },
    logoImage: {
        width: "30px",
        display: "inline-block",
        maxHeight: "30px",
        marginLeft: "10px",
        marginRight: "15px"
    },
    img: {
        width: "35px",
        position: "absolute",
        verticalAlign: "middle",
        border: "0"
    }
});

export default logoStyle;
