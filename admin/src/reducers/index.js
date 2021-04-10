import authReducer from "./auth.reducers";
import inventoryReducer from "./inventory.reducers";
// import ordersReducer from "./orders.reducers";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  auth: authReducer,
  inventory: inventoryReducer,
  // ord: ordersReducer,
});

export default rootReducer;
