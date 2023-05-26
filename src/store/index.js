import { useDispatch as useReduxDispatch, useSelector as useReduxSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

// Import the generated reducer as `authReducer`
import authReducer from '../features/authSlice'
import { authApi } from '../services/authApi';
import { userApi } from '../services/userApi';
import { categoryApi } from '../services/categoryApi';
import { subCategoryApi } from '../services/subCategoryApi';
import { thirdSubCategoryApi } from '../services/ThirdSubCategoryApi';
import { documentApi } from '../services/documentApi';
import { publishApi } from '../services/publishApi';
import { groupApi } from '../services/groupApi';
import { companyApi } from '../services/companyApi';






// Combine the generated reducer with the other reducers
const store = configureStore({
  reducer: {

    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [subCategoryApi.reducerPath]: subCategoryApi.reducer,
    [thirdSubCategoryApi.reducerPath]: thirdSubCategoryApi.reducer,
    [documentApi.reducerPath]: documentApi.reducer,
    [publishApi.reducerPath]: publishApi.reducer,
    [groupApi.reducerPath]: groupApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    devTools: true
  },

  // Add the generated middleware to the store
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      userApi.middleware,
      categoryApi.middleware,
      subCategoryApi.middleware,
      thirdSubCategoryApi.middleware,
      documentApi.middleware,
      publishApi.middleware,
      groupApi.middleware,
      companyApi.middleware,
    ])
});
setupListeners(store.dispatch);
export const useSelector = useReduxSelector;

export const useDispatch = () => useReduxDispatch();

export default store;
