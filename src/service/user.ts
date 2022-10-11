// import { itLogin } from './../actions/user';
import { toast } from "react-toastify";
import { LOCAL_STORE } from "../constants/localStore";
import { ItLogin } from "../interface/login";
import { getStorage } from "../utils/localStorage";

export const Login = async (login: ItLogin) => {
  try {
    const DB_user = getStorage(LOCAL_STORE.DB_USER);
    const user:ItLogin = DB_user.find((item:ItLogin) => {
      return item.user === login.user;
    })
    if (user?.password === login?.password) {
      return user;
    }
    if (!user) {
      toast.error("Usuário ou senha inválidos");
      return false;
    }
    
  } catch (error) {
    console.error(error.message);
    toast.error("Erro realizar Login");
    return null;
  }
};