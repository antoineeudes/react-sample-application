// import { compose, createStore } from 'redux';
// import manageUserInfo from './userInfoReducer'
// import { autoRehydrate, persistStore } from 'redux-persist'
// // import storage from 'redux-persist/lib/storage' 

// // const persistConfig = {
// //   key: 'root',
// //   storage,
// // };

// // const persistedReducer = persistReducer(persistConfig, manageUserInfo);
// // // const store = createStore(manageUserInfo)
// // const store = createStore(persistedReducer);
// // // const persistor = persistStore(store);
// // // export default () => {
// // //     let store = createStore(persistedReducer)
// // //     let persistor = persistStore(store)
// // //     return { store, persistor }
// // //   }
// // export default store

// let store = compose(autoRehydrate())(createStore)(manageUserInfo);
// persistStore(store);
// export default store;

import { createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import manageUserInfo from './userInfoReducer';

const persistConfig = {
 key: 'root',
 storage: storage,
 stateReconciler: autoMergeLevel2 // see "Merge Process" section for details.
};

const pReducer = persistReducer(persistConfig, manageUserInfo);

export const store = createStore(pReducer);
export const persistor = persistStore(store);