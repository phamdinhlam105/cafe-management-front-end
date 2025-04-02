import { BaseReport } from "./base-report-model";
import { DailyReport } from "./daily-report-model";

export interface MonthlyReport extends BaseReport{
    
    startDate:string;
    endDate:string;
    bestDay:{
        weekDay:string;
        avgRevenue:string;
    }[],
    dailyReports:DailyReport[];
}