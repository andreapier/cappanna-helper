import { put, takeLatest } from "redux-saga/effects";
import { signinCompleted, loadingChanged, loadStandsListRequested, signalApiError } from "actions";
import { LOAD_USER_DATA } from "actions/types";
import localforage from "localforage";
import Api from "api";
import history from "../chHistory";
import { getDefaultRoute } from "routes/helpers";

const loadUserDataFromStorage = () => localforage.getItem("userData").catch((err) => console.error("Error loading user data from local storage", err));

function* loadUserData() {
    try {
        yield put(loadingChanged(true, "Caricamento dati utente..."));
        const userData = yield loadUserDataFromStorage();

        if (!userData) {
            return;
        }

        const api = new Api();
        api.setToken(userData.token);

        yield put(signinCompleted(userData));
        yield put(loadStandsListRequested());

        const route = getDefaultRoute(userData.roles[0]);
        history.navigate(route);
    } catch (e) {
        yield put(signalApiError(e));
    } finally {
        yield put(loadingChanged(false));
    }
}

function* loadUserDataSaga() {
    yield takeLatest(LOAD_USER_DATA, loadUserData);
}

export default loadUserDataSaga;
