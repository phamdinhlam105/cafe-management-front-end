import { BaseReport } from "./base-report-model";

export interface DailyReport extends BaseReport{
    reportDate: string;
    peakHours: number[];
}