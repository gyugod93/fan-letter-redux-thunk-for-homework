import { createSlice } from "@reduxjs/toolkit";

const selectMemberSlice = createSlice({
  name: "selectMember",
  initialState: { selectMemberId: 0 },
  reducers: {
    choiseMember: (state, action) => {
      state.selectMemberId = action.payload;
    },
  },
});

export const { choiseMember } = selectMemberSlice.actions;
export default selectMemberSlice.reducer;
