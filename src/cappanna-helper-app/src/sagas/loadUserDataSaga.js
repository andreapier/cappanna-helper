import { put, takeLatest, call } from "redux-saga/effects";
import {
    signinCompleted,
    loadingChanged,
    loadMenuDetailsRequested,
    setError,
    signoutRequested
} from "actions";
import { LOAD_USER_DATA } from "actions/types";
import localforage from "localforage";
import Api from "api";
import history from "./../history";

const loadUserDataFromStorage = () =>
    localforage
        .getItem("userData")
        .catch(err =>
            console.log("Error loading user data from local storage", err)
        );

function* loadUserData() {
    try {
        yield put(loadingChanged(true, "Caricamento dati utente..."));
        const userData = yield loadUserDataFromStorage();

        if (!userData) {
            return;
        }

        const api = new Api();
        yield call(api.signinByToken, userData);
        yield put(signinCompleted(userData));
        history.push("/order/new");
        yield put(loadMenuDetailsRequested());
    } catch (e) {
        if (e.response && e.response.status === 401) {
            yield put(signoutRequested());
        } else {
            yield put(setError(e.message));
        }
    } finally {
        yield put(loadingChanged(false));
    }

    yield put(loadingChanged(false));
}

function* loadUserDataSaga() {
    yield takeLatest(LOAD_USER_DATA, loadUserData);
}

export default loadUserDataSaga;
