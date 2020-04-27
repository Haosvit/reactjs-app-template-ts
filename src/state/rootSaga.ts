import { spawn, call } from '@redux-saga/core/effects';
const sagas = [];

export default function* rootSaga() {
  for (const saga of sagas) {
    yield spawn(function* () {
      while (true) {
        try {
          yield call(saga);
          break;
        } catch (e) {
          console.log('ROOT SAGA: ', e);
        }
      }
    });
  }
}
