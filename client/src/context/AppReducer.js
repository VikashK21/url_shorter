export const TYPES = {
  GETALL: "GETALL",
  ERROR: "ERROR",
  ADD: "ADD"
};

export const initialState = {
  urls: {},
  msg: ""
};

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.GETALL:
      return { urls: action.payload.result, msg: action.payload.msg };
    case TYPES.ERROR:
      return { msg: action.payload };
    case TYPES.ADD:
      return {urls: action.payload}
    default:
      return state;
  }
};

export default AppReducer;
