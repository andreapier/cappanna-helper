import { call, put, takeLatest } from "redux-saga/effects";
import Api from "api";
import {
    signinCompleted,
    setError,
    loadingChanged,
    loadMenuDetailsRequested
} from "actions";
import { SIGNIN_REQUESTED } from "actions/types";
import localforage from "localforage";
import history from "./../history";

const saveUserData = userData =>
    localforage
        .setItem("userData", userData)
        .catch(err =>
            console.log("Error saving user data in local storage", err)
        );

function* signin(action) {
    try {
        yield put(loadingChanged(true, "Login in corso..."));
        const api = new Api();
        const userData = yield call(api.signin, action.payload);

        if (action.payload.rememberMe) {
            yield saveUserData(userData);
        }

        yield put(signinCompleted(userData));
        history.push("/order/new");
    } catch (e) {
        yield put(setError(e.message));
    }

    yield put(loadMenuDetailsRequested());
}

function* signinSaga() {
    yield takeLatest(SIGNIN_REQUESTED, signin);
}

export default signinSaga;
