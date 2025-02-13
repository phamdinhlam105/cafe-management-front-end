import { StockDetail } from "../stockDetail/stockDetail-model";

export interface Stock{
    id: string;
    createDate: string;
    details: StockDetail[]
}