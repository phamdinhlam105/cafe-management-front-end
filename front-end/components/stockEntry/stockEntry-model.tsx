import { StockEntryDetail } from "../stockEntryDetail/stockEntryDetail-model";

export interface StockEntry{
    id:string;
    createdDate:string;
    createdUser:string;
    details: StockEntryDetail[];
}