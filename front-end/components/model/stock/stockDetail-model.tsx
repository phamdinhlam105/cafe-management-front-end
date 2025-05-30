import { Ingredient } from "./ingredient-model";

export interface StockDetail{
    id: string;
    idStock: string;
    stockAtStartOfDay: number;
    stockImport: number;
    stockRemaining: number;
    ingredient: Ingredient;
}