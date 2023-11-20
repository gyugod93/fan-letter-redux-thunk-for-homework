// store.js
import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import selectMember from "redux/modules/selectMember";
import letters from "redux/modules/letters";

const rootReducer = combineReducers({
  selectMember,
  letters,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
