import { configureStore } from '@reduxjs/toolkit'
import postsSlice from './features/postsSlice';
import userSlice from './features/userSlice'
import appApi from './services/appApi';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';

const reducers = combineReducers({
    user: userSlice,
    post: postsSlice,
    [appApi.reducerPath]: appApi.reducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [appApi.reducerPath],
};

const persistedReducer = persistReducer(persistConfig, reducers)

const store = configureStore({
  reducer: persistedReducer,
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: [thunk, appApi.middleware],
})

export default store;