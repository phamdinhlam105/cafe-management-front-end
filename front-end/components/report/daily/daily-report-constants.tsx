import { PRODUCTS } from "@/components/product/constants";
import { DailyReport } from "./daily-report-model";


export const DAILY_REPORTS: DailyReport[] = [
    {
        id: "1",
        totalRevenue: "8000000",
        totalExpenditure: "2500000",
        topSelling: PRODUCTS[0],
        leastSelling: PRODUCTS[3],
        numberOfFinishedOrders: 20,
        numberOfCancelledOrders: 2,
        totalProductsSold: 50,
        createDate: "23/2/2025 23:59:59",
        reportDate: "21/2/2025",
        peakHours: [16, 19]
    },
    {
        id: "2",
        totalRevenue: "9000000",
        totalExpenditure: "3000000",
        topSelling: PRODUCTS[0],
        leastSelling: PRODUCTS[3],
        numberOfFinishedOrders: 23,
        numberOfCancelledOrders: 1,
        totalProductsSold: 60,
        createDate: "23/2/2025 23:59:59",
        reportDate: "22/2/2025",
        peakHours: [16, 19]
    },
    {
        id: "3",
        totalRevenue: "11000000",
        totalExpenditure: "3000000",
        topSelling: PRODUCTS[0],
        leastSelling: PRODUCTS[3],
        numberOfFinishedOrders: 35,
        numberOfCancelledOrders: 1,
        totalProductsSold: 70,
        createDate: "23/2/2025 23:59:59",
        reportDate: "23/2/2025",
        peakHours: [9, 16]
    }
]