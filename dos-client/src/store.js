import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

// Persist configuration
const persistConfig = {
    key: "root",
    storage,
};

// Combine reducers
const rootReducer = combineReducers({
    user: userReducer,
});

// Persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE","persist/PURGE"], // Ignore redux-persist actions
            },
        }),
});

// Persistor
const persistor = persistStore(store);

export { store, persistor };
