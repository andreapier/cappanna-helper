import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetNotification } from "actions";
import Info from "@mui/icons-material/Info";
import Warning from "@mui/icons-material/Warning";
import ErrorIcon from "@mui/icons-material/Error";
import Snackbar from "components/Snackbar/Snackbar";
import SlideUpTransition from "components/Snackbar/SlideUpTransition";

const NotificationSnackbar = (props) => {
    const type = useSelector(state => state.message.type);
    const message = useSelector(state => state.message.message);
    const dispatch = useDispatch();
    const handleClose = () => dispatch(resetNotification());

    let icon = ErrorIcon;
    let color = "danger";

    if (type === "info") {
        icon = Info;
        color = "primary";
    } else if (type === "warning") {
        icon = Warning;
        color = "warning";
    }

    return (
        <Snackbar
            onClose={handleClose}
            message={message}
            color={color}
            icon={icon}
            autoHideDuration={5000}
            transition={SlideUpTransition}
            open={!!message}
            place="bc"
        />
    );
};

export default NotificationSnackbar;
