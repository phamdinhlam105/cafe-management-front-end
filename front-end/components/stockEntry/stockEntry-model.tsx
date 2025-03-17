import { StockEntryDetail } from "../stockEntryDetail/stockEntryDetail-model";

export interface StockEntry {
    id: string;
    createdDate: string;
    createdUser?: string;
    totalValue: string,
    details: StockEntryDetail[];
}