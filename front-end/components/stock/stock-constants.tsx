import { STOCK_DETAILS } from "../stockDetail/stockDetail-constants";
import { Stock } from "./stock-model";

export const STOCK:Stock = {
    id: "1",
    createDate: Date.now.toString(),
    details: STOCK_DETAILS
}