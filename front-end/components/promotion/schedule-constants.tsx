import { PROMOTIONS } from "./promotion-constants";
import { PromotionSchedule } from "./schedule-model";

export const PROMOTION_SCHEDULES:PromotionSchedule[]=[
    {
        id: "1",
        promotion: PROMOTIONS[0],
        startDate: "3/2/2024 00:00:00",
        endDate: "8/2/2024 23:59:59",
        note: "Tết 2024"
    },
    {
        id: "2",
        promotion: PROMOTIONS[1],
        startDate: "23/2/2025 00:00:00",
        endDate: "23/2/2025 23:59:59",
        note: "Chủ nhật cuối tháng 2"
    },
]