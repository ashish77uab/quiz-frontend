import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import SagaReducer from "./features/sagaSlice";
import product from "./features/productSlice";
import createSagaMiddleware from "redux-saga";
import MySagas from "./rootSaga";
const sagaMiddleware = createSagaMiddleware();
const rootReducer = combineReducers({
  auth: AuthReducer,
  saga: SagaReducer,
  product: product,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(MySagas);
