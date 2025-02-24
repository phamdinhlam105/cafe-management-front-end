import { PRODUCTS } from "@/components/product/constants";
import { MonthlyReport } from "./monthly-report-model";
import { DAILY_REPORTS } from "../daily/daily-report-constants";

export const MONTHLY_REPORTS: MonthlyReport[] = [
    {
        id: "1",
        totalRevenue: "28000000",
        totalExpenditure: "8500000",
        topSelling: PRODUCTS[0],
        leastSelling: PRODUCTS[3],
        numberOfFinishedOrders: 78,
        numberOfCancelledOrders: 4,
        totalProductsSold: 180,
        createDate: "23/2/2025 23:59:59",
        startDate: "1/2/2025",
        endDate: "28/2/2025",
        bestDay: [
            {
                id: "1",
                reportId: "1",
                weekDay: "Saturday",
                avgRevenue: "10000000"
            },
            {
                id: "2",
                reportId: "1",
                weekDay: "Sunday",
                avgRevenue: "12000000"
            }
        ],
        dailyReports: DAILY_REPORTS
    },
   
]