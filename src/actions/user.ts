import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Dispatch } from "redux";
import { ItLogin } from "../interface/login";
import { userTypes } from "../reducers/user";


import { RootState } from "../store";
import { removeStorage } from "../utils/localStorage";
import { peopleActions } from "./people";


export const userActions:any  = {
  login:
    (data:ItLogin) => 
      async (dispatch: Dispatch<any>) => {
        try {
          dispatch(peopleActions.getPeople());
          dispatch({ type: userTypes.SAVE_USER, data });
        } catch (error) {
          console.error(error.message);

          toast.error("Erro ao fazer login");
          return null;
        }
      },
  logout: () => async (dispatch: Dispatch<any>) => {
    try {
      dispatch({ type: userTypes.CLEAR_USER });
      toast.success("Logout realizado com sucesso");
      removeStorage("user");
    } catch (error) {
      console.error(error.message);
      toast.error("Erro ao Sair");
      return null;
    }
  },
};

export const useAuthSelector = () =>
  useSelector((store: RootState) => store.user);
