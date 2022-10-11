import { ItActionUser } from "../interface/action";
import { ItLogin } from "../interface/login";

export const userTypes = {
  SAVE_USER: "@user/SAVE_USER",
  CLEAR_USER: "@user/CLEAR_USER",
};
const initialState: ItLogin = {
  id: -1,
  user: '',
  password: '',
};

function userReducer(state = initialState, action: ItActionUser) {
  switch (action.type) {
    case userTypes.SAVE_USER:
      return {
        ...state,
        ...action.data,
      };
    case userTypes.CLEAR_USER:
      return {
        ...initialState,
      };
    default:
      return { ...state };
  }
}
export default userReducer;
