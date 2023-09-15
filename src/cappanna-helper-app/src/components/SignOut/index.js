import React, { useEffect } from "react";
import P from "components/Typography/P";
import { useDispatch } from "react-redux";
import { signoutRequested } from "actions";

const SignOut = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(signoutRequested());
    });

    return <P>Arrivedorci!</P>;
}

export default SignOut;
