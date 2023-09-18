import { createStore, applyMiddleware } from "redux";
import rootReducer from "reducers";
import { composeWithDevTools } from "redux-devtools-extension";
import rootSaga from "./sagas";
import createSagaMiddleware from "redux-saga";
import signalRMiddleware from "api/signalR/middleware";

const store = (initialState = {}) => {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [signalRMiddleware, sagaMiddleware];
    const composeEnhancers = composeWithDevTools({
        actionsDenylist: ["@@"]
    });

    const store = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(...middlewares)));

    if (process.env.NODE_ENV !== "production") {
        if (module.hot) {
            module.hot.accept("reducers", () => {
                store.replaceReducer(rootReducer);
            });
        }
    }

    sagaMiddleware.run(rootSaga);

    return store;
};

export default store;