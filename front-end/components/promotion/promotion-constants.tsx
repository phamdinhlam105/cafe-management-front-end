import { Promotion } from "./promotion-model";

export const PROMOTIONS: Promotion[] = [
    {
        id: "1",
        name: "Khuyến mãi ngày lễ",
        description: "Tết",
        value: 20,
        isActive: false
    },
    {
        id: "2",
        name: "Khuyến mãi cuối tuần",
        description: "chủ nhật",
        value: 10,
        isActive: true
    },
]