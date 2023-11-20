const initialState = {
  selectMemberId: 0,
};

const SET_SELECT_MEMBER = "selectMember/SET_SELECT_MEMBER";

export function choiseMember(payload) {
  return {
    type: SET_SELECT_MEMBER,
    payload: payload,
  };
}

const selectMember = (state = initialState, action) => {
  switch (action.type) {
    case SET_SELECT_MEMBER:
      console.log(action.payload);
      return { ...state, selectMemberId: action.payload };

    default:
      return state;
  }
};

export default selectMember;
