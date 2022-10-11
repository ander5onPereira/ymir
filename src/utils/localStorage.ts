import { ItSaveStorage } from "../interface/localStorage";

export const saveStorage = ({ key, value }: ItSaveStorage) => {
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(error);
  }
};
export const getStorage = (key: string) => {
  try {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
    return null;
  } catch (error) {
    console.error(error);
  }
};

export const removeStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
