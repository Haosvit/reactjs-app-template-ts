import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
    }
}

const initialiseSagaMiddleware = createSagaMiddleware();
const composeEnhancers =
    process.env.NODE_ENV !== 'production' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
              actionSanitizer: (action) => {
                  const message = action.payload && action.payload.message;
                  return (action.type as string).endsWith('FAILURE')
                      ? {
                            ...action,
                            payload: !!message ? `(DEV) Error message: ${message}` : undefined,
                        }
                      : action;
              },
          })
        : compose;

const enhancer = composeEnhancers(applyMiddleware(initialiseSagaMiddleware));

const store = createStore(rootReducer, enhancer);

initialiseSagaMiddleware.run(rootSaga);

export default store;
