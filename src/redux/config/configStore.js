import { configureStore } from "@reduxjs/toolkit";
import selectMember from "redux/modules/selectMember";
import letters from "redux/modules/letters";
import auth from "redux/modules/authSlice";

const store = configureStore({
  reducer: { selectMember, letters, auth },
});

export default store;
