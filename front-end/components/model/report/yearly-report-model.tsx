import { BaseReport } from "../../model/report/base-report-model";
import { QuarterlyReport } from "./quarterly-report-model";

export interface YearlyReport extends BaseReport{
    year:Number,
    quarterlyReport: QuarterlyReport[],

}