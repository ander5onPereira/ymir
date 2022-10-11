import { getStorage, saveStorage } from "./../utils/localStorage";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RootState } from "../store";
import { peopleTypes } from "../reducers/people";
import { LOCAL_STORE } from "../constants/localStore";
import { Dispatch } from "redux";
import { ItPeople } from "../interface/people";

export const peopleActions:any = {
  add: (data: ItPeople) => async (dispatch: Dispatch<any>) => {
    try {
      const listPeople = getStorage(LOCAL_STORE.DB_PEOPLE);
      const endPeople = listPeople[listPeople.length - 1];
      data.id = listPeople.length > 0 ? endPeople.id + 1 : 1;
      listPeople.push(data);
      const newPeople: string = JSON.stringify(listPeople);
      saveStorage({ key: LOCAL_STORE.DB_PEOPLE, value: newPeople });
      dispatch({ type: peopleTypes.SAVE_UPDATE, data: listPeople });
      toast.success("Novo cadastro realizado com sucesso");
    } catch (error) {
      console.error(error.message);
      toast.error("Não foi possivel realizar o cadastro no momento.");
      return null;
    }
  },
  del: (id: number) => async (dispatch: Dispatch<any>) => {
    try {
      const listPeople: ItPeople[] = getStorage(LOCAL_STORE.DB_PEOPLE);
      const newListPeople: ItPeople[] = listPeople.filter(
        (person: ItPeople) => person.id !== id
      );
      const newPeople: string = JSON.stringify(newListPeople);
      saveStorage({ key: LOCAL_STORE.DB_PEOPLE, value: newPeople });
      dispatch({ type: peopleTypes.SAVE_UPDATE, data: newListPeople });
      toast.success("Cadastro removido com sucesso.");
    } catch (error) {
      console.error(error.message);

      toast.error("Não foi possivel remover esse cadastro no momento.");
      return null;
    }
  },
  edit: (data: ItPeople) => async (dispatch: Dispatch<any>) => {
    try {
      const listPeople = getStorage(LOCAL_STORE.DB_PEOPLE);
      const newListPeople: ItPeople[] = listPeople.map((person: ItPeople) => {
        if (person.id === data.id) {
          return data;
        } else {
          return person;
        }
      });
      const newPeople: string = JSON.stringify(newListPeople);
      saveStorage({ key: LOCAL_STORE.DB_PEOPLE, value: newPeople });
      dispatch({ type: peopleTypes.SAVE_UPDATE, data: newListPeople });
      toast.success("Cadastro atualizado com sucesso");
    } catch (error) {
      console.error(error.message);

      toast.error("Não foi possivel realizar a atualização.");
      return null;
    }
  },
  getPeople: () => async (dispatch: Dispatch<any>) => {
    try {
      const listPeople: ItPeople[] = getStorage(LOCAL_STORE.DB_PEOPLE);
      dispatch({ type: peopleTypes.LOADING_PEOPLE, data: listPeople });
    } catch (error) {}
  },
};
export const usePeopleSelector = () =>
  useSelector((store: RootState) => store.people);
