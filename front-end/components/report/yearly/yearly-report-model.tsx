import { BaseReport } from "../base-report-model";
import { QuarterlyReport } from "../quarterly/quarterly-report-model";

export interface YearlyReport extends BaseReport{
    year:Number,
    quarterlyReport: QuarterlyReport[],

}