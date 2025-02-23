"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

export default function ReportChart({ data }: { data: any[] }) {
    const parseDate = (dateStr: string) => {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day);
    };

    const sortedReports = data.sort((a, b) => {
        return parseDate(a.reportDate).getTime() - parseDate(b.reportDate).getTime();
    });
    const chartData = sortedReports.map(report => ({
        reportDate: report.reportDate,
        totalRevenue: report.totalRevenue,
        totalExpenditure: report.totalExpenditure,
        numberOfFinishedOrders: report.numberOfFinishedOrders,
        numberOfCancelledOrders: report.numberOfCancelledOrders,
        totalProductsSold: report.totalProductsSold
    }));
    const chartConfig = {
        totalRevenue: {
            label: "Doanh thu",
            color: "#2563eb",
        },
        totalExpenditure: {
            label: "Chi tiêu",
            color: "#60a5fa",
        },
        numberOfFinishedOrders: {
            label: "Đơn hoàn thành",
            color: "#17fc03"
        },
        numberOfCancelledOrders: {
            label: "Tổng đơn hủy",
            color: "#ff0000"
        },
        totalProductsSold: {
            label: "Số sản phẩm đã bán",
            color: "#ebe834"
        }
    }
    return <div className="flex space-x-2 w-1/2">
        <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="revenue">Doanh thu</TabsTrigger>
                <TabsTrigger value="amount">Đơn hàng & sản phẩm</TabsTrigger>
            </TabsList>
            <TabsContent value="revenue">
                <ChartContainer config={chartConfig} className="border rounded-sm shadow-md" >
                    <BarChart accessibilityLayer data={chartData}>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="reportDate"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis tickFormatter={(value) => Number(value).toLocaleString()} />
                        <Bar dataKey="totalRevenue" fill="var(--color-totalRevenue)" radius={4} />
                        <Bar dataKey="totalExpenditure" fill="var(--color-totalExpenditure)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </TabsContent>
            <TabsContent value="amount">
                <ChartContainer config={chartConfig} className=" border rounded-sm shadow-md" >
                    <BarChart accessibilityLayer data={chartData}>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="reportDate"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <YAxis tickFormatter={(value) => Number(value).toLocaleString()} />
                        <Bar dataKey="numberOfFinishedOrders" fill="var(--color-numberOfFinishedOrders)" radius={4} />
                        <Bar dataKey="numberOfCancelledOrders" fill="var(--color-numberOfCancelledOrders)" radius={4} />
                        <Bar dataKey="totalProductsSold" fill="var(--color-totalProductsSold)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </TabsContent>
        </Tabs>
    </div>
}