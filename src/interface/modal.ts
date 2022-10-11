import { ItPeople } from "../interface/people";

export interface ItModal{
  FnAction: any;
  option: OptionAction;
  date?: ItPeople;
}
export type OptionAction = "edit" | "del" | "view" | "new";