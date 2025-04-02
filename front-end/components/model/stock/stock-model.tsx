import { StockDetail } from "./stockDetail-model";

export interface Stock{
    id: string;
    createDate: string;
    details: StockDetail[]
}