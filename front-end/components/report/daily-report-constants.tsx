import { PRODUCTS } from "../product/constants";
import { DailyReport } from "./daily-report-model";

export const DAILY_REPORTS:DailyReport[]=[
    {
        baseReport:{
            id: "1",
            totalRevenue: "10000000",
            totalExpenditure: "3000000",
            topSelling: PRODUCTS[0],
            leastSelling: PRODUCTS[3],
            numberOfFinishedOrders: 20,
            numberOfCancelledOrders: 1,
            totalProductsSold: 50,
            createDate: "23/2/2025 23:59:59"
        },
        reportDate:"23/2/2025",
        peakHours:[3,4]
    }
]