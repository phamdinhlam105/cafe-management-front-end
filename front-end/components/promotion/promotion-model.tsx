import { PromotionSchedule } from "./schedule-model";


export interface Promotion {
    id: string;
    name: string;
    description: string;
    value: number;
    isActive: boolean;
    schedules:PromotionSchedule[]
}