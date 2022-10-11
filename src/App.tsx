import { AppRoutes } from "./Routes";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { getStorage, saveStorage } from "./utils/localStorage";
import { useDispatch } from "react-redux";
import { userActions } from "./actions/user";
import { LOGIN_MOCK } from "./mock/login";
import { PEOPLE_MOCK } from "./mock/people";
import { LOCAL_STORE } from "./constants/localStore";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    startLocalStorage();
    initialSistem();
  }, []);

  const startLocalStorage = async () => {
    const mockLogin: string = JSON.stringify(LOGIN_MOCK);
    const mockPeople: string = JSON.stringify(PEOPLE_MOCK);
    const DB_user = await getStorage(LOCAL_STORE.DB_USER);
    const DB_people = await getStorage(LOCAL_STORE.DB_PEOPLE);
    if (!DB_user) {
      saveStorage({ key: LOCAL_STORE.DB_USER, value:mockLogin });
    }
    if (!DB_people) {
      saveStorage({ key: LOCAL_STORE.DB_PEOPLE, value:mockPeople });
    }
  }
  const initialSistem = async () => {
    try {
      const data = await getStorage(LOCAL_STORE.USER);

      if (data) {
        
        dispatch(userActions.login( data));
      }
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao inicializar o sistema");
    }
  };
  return (
    <>
      <AppRoutes />
      <ToastContainer autoClose={2000} className="toast-container" limit={2} closeButton={false} position="top-center"/>
    </>
  );
}

export default App;
