
import { MonthlyReport } from "../../model/report/monthly-report-model";
import { BaseReport } from "./base-report-model";

export interface QuarterlyReport extends BaseReport{
    quarter: number;
    startDate:string;
    endDate:string;
    bestDay:{
        id:string;
        reportId:string;
        weekDay:string;
        avgRevenue:string;
    }[],
    monthlyReports:MonthlyReport[]
}