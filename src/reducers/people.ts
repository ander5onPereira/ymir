import { ItActionPeople } from "../interface/action";
import { ItPeople } from "../interface/people";

export const peopleTypes = {
  LOADING_PEOPLE: "@people/LOADING_PEOPLE",
  SAVE_UPDATE: "@people/SAVE_UPDATE",
};
const initialState = {
  peoples: []
};
function peopleReducer(state = initialState, action: ItActionPeople) {
  switch (action.type) {
    case peopleTypes.LOADING_PEOPLE:
      return {
        ...state,
        peoples:action.data,
      };
    case peopleTypes.SAVE_UPDATE:
      return {
        ...state,
        peoples:action.data,
      };
    default:
      return { ...state };
  }
}
export default peopleReducer;
