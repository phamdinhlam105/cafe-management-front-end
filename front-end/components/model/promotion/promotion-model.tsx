import { PromotionSchedule } from "./schedule-model";


export interface Promotion {
    id: string;
    name: string;
    description: string;
    discount: number;
    isActive: boolean;
    schedules:PromotionSchedule[]
}