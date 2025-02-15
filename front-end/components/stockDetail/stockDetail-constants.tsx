import { INGREDIENTS } from "../ingredient/ingredient-constants";
import { StockDetail } from "./stockDetail-model";

export const STOCK_DETAILS:StockDetail[] = [
    {
        id: "1",
        startOfDay: 10,
        import: 0,
        remain: 10,
        ingredient: INGREDIENTS[0]
    },
    {
        id: "2",
        startOfDay: 10,
        import: 0,
        remain: 10,
        ingredient: INGREDIENTS[1]
    },
    {
        id: "3",
        startOfDay: 10,
        import: 0,
        remain: 10,
        ingredient: INGREDIENTS[2]
    },
    {
        id: "4",
        startOfDay: 10,
        import: 0,
        remain: 10,
        ingredient: INGREDIENTS[3]
    },
    {
        id: "5",
        startOfDay: 10,
        import: 0,
        remain: 10,
        ingredient: INGREDIENTS[4]
    },
]