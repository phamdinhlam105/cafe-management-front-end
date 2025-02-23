import { Promotion } from "./promotion-model";

export interface PromotionSchedule{
    id:string;
    promotion: Promotion;
    startDate: string;
    endDate: string;
    note: string;
}