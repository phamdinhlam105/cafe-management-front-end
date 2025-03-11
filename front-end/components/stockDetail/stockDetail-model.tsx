import { Ingredient } from "../ingredient/ingredient-model";

export interface StockDetail{
    id: string;
    idStock: string;
    stockAtStartOfDay: number;
    stockImport: number;
    stockRemain: number;
    ingredient: Ingredient;
}