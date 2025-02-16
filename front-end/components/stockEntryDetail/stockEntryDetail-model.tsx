import { Ingredient } from "../ingredient/ingredient-model";

export interface StockEntryDetail{
    id:string;
    stockEntryId:string;
    quantity:number;
    price:string;
    ingredient:Ingredient;
    total: string;
}