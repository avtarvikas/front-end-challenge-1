import { combineReducers } from "redux";
import taskData from "../actions/taskData";

const rootReducer = combineReducers({ taskData });

export default rootReducer;
