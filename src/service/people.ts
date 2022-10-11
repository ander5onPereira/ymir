import { toast } from "react-toastify";
import { LOCAL_STORE } from "../constants/localStore";
import { ItPeople } from "../interface/people";
import { getStorage } from "../utils/localStorage";

export const getPeople = async () => {
  try {
    const DB_people = getStorage(LOCAL_STORE.DB_PEOPLE);
    if (DB_people) {
      return DB_people as ItPeople[];    
    }
    return [];
  } catch (error) {
    console.error(error.message);
    toast.error("Erro realizar Login");
    return [];
  }
};