import { Ingredient } from "../ingredient/ingredient-model";

export interface StockDetail{
    id: string;
    idStock: string;
    startOfDay: number;
    import: number;
    remain: number;
    ingredient: Ingredient;
}