import { Ingredient } from "./ingredient-model";

export interface StockEntryDetail {
    id: string;
    ingredientId: string;
    stockEntryId: string;
    quantity: number;
    price: string;
    ingredient: Ingredient;
    totalValue: string;
}