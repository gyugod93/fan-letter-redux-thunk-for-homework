const initialState = {
  letters: [],
};

const SET_LETTERS = "letters/SET_LETTERS";
const DELETE_LETTER = "letters/DELETE_LETTER";
const EDITED_LETTER = "letters/EDITED_LETTER";

export function addLetters(payload) {
  return {
    type: SET_LETTERS,
    payload,
  };
}

export function deleteLetters(payload) {
  return {
    type: DELETE_LETTER,
    payload,
  };
}

export function editedLetters(payload) {
  return {
    type: EDITED_LETTER,
    payload,
  };
}

const letters = (state = initialState, action) => {
  switch (action.type) {
    case SET_LETTERS:
      console.log(action);
      return { ...state, letters: [...state.letters, action.payload] };

    case DELETE_LETTER:
      return {
        ...state,
        letters: state.letters.filter((letter) => letter.id !== action.payload),
      };
    case EDITED_LETTER:
      return {
        ...state,
        letters: state.letters.map((letter) => {
          if (letter.id === action.payload.id) {
            return { ...letter, content: action.payload.content };
          } else {
            return letter;
          }
        }),
      };

    default:
      return state;
  }
};

export default letters;
