import { STOCK_DETAILS } from "../stockDetail/stockDetail-constants";
import { Stock } from "./stock-model";

export const STOCK:Stock = {
    id: "1",
    createDate: (new Date()).toDateString(),
    details: STOCK_DETAILS
}