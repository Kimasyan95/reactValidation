const initialState = {};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
