import { combineReducers } from "redux";

import userReducers from "./user";
import peopleReducers from "./people";


const rootReducer = combineReducers({
  user: userReducers,
  people: peopleReducers,
});

export default rootReducer;
