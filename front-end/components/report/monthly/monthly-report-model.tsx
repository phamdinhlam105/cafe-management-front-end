import { BaseReport } from "../base-report-model";
import { DailyReport } from "../daily/daily-report-model";

export interface MonthlyReport extends BaseReport{
    
    startDate:string;
    endDate:string;
    bestDay:{
        id:string;
        reportId:string;
        weekDay:string;
        avgRevenue:string;
    }[],
    dailyReports:DailyReport[];
}