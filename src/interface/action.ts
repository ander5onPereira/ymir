import { ItLogin } from "./login";
import { ItPeople } from "./people";

export interface ItActionUser{
  type: string;
  data: ItLogin;
}
export interface ItActionPeople{
  type: string;
  data: ItPeople;
}