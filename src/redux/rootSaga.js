import { spawn } from 'redux-saga/effects'
import  categoriesWatcher  from "./sagas/categoriesSaga";
import authWatcher from "./sagas/authSaga";

export default function* rootSaga() {
  yield spawn(categoriesWatcher)
  yield spawn(authWatcher)
 
}
