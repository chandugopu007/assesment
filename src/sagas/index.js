import { put, takeLatest, all } from 'redux-saga/effects';
function* fetchDrones() {
    const json = yield fetch('https://react-assessment-api.herokuapp.com/api/drone')
        .then(response => response.json());
    yield put({ type: "MEASUREMENT_RECEIVED", json: json.data });
}
function* actionWatcher() {
    yield takeLatest('GET_MEASUREMENTS', fetchDrones)
}
export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}