import { BaseReport } from "./base-report-model";

export interface DailyReport{
    baseReport: BaseReport;
    reportDate: string;
    peakHours: Number[];
}