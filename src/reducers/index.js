const reducer = (state, action) => {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        ...state,
        user: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        user: {},
      };
    default:
      return state;
  }
};

export default reducer;
