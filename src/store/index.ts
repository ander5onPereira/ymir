import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { encryptTransform } from "redux-persist-transform-encrypt";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";

const encryptor = encryptTransform({
  secretKey:
    "4U~~Y)e~|D@;0e3RgmDD)bO>}zW&E6oz8<$6~TqL`k<qw7yCA!v@=gt*M)3]QTvUvvv",
  onError: (error) => console.error(error),
});
const composeEnhancers =
  //@ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? //@ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));
const configuredReducers = persistReducer(
  {
    key: "ymir-gt*M)3]QTvUvvv",
    storage,
    whitelist: ["stage", "user"],
    transforms: [encryptor],
  },
  rootReducer
);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const store = createStore(configuredReducers, undefined, enhancer);
export const persistor = persistStore(store);

export default store;
