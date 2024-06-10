import { combineReducers } from 'redux';
import authReducer from './slices/authSlice';
import popupReducer from './slices/popupSlice';
import categoriesReducer from './slices/categoriesSlice';
import commonReducer from './slices/commonSlice';
import savedReducer from './slices/savedSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  popup: popupReducer,
  categories: categoriesReducer,
  common: commonReducer,
  saved: savedReducer,
});

export default rootReducer;
