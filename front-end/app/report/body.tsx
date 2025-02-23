"use client"
import { BaseReport } from "@/components/report/base-report-model";
import { DAILY_REPORTS } from "@/components/report/daily-report-constants";
import { DailyReport } from "@/components/report/daily-report-model";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, LabelProps, XAxis } from "recharts";

export default function ReportBody() {
    const [data, setData] = useState<BaseReport[]>(DAILY_REPORTS.map(dr => dr.baseReport));
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
            label: "Tổng đơn hoàn thành",
            color: "#17fc03"
        },
        numberOfCancelledOrders: {
            label: "Tổng đơn hủy",
            color: "#ff0000"
        }
    }

    const renderCustomLabel = ({
        x = 0,
        y = 0,
        width = 50,
        height = 50,
    }, label: string) => {
        const offset = 10; 
        return (
            <text
                x={x + width / 2}
                y={y + height + offset}
                textAnchor="middle"
                fill="#333"
                fontSize={12}
                
            >
                {label}
            </text>
        );
    };

    return <div className="p-4 space-y-5">
        <div className="flex">
            <div>
                <h2 className="text-xl font-bold mb-4">Doanh thu</h2>
                <ChartContainer config={chartConfig} className="min-h-[300px] pb-10" >
                    <BarChart accessibilityLayer data={data}>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <CartesianGrid vertical={false} />

                        <Bar
                            dataKey="totalRevenue"
                            fill="var(--color-totalRevenue)"
                            radius={4}
                            label={(props)=>renderCustomLabel(props,"Tổng doanh thu")} />
                        <Bar
                            dataKey="totalExpenditure"
                            fill="var(--color-totalExpenditure)"
                            radius={4}
                            label={(props)=>renderCustomLabel(props,"Tổng chi tiêu")} />
                    </BarChart>
                </ChartContainer>
            </div>
            <div>
                <h2 className="text-xl font-bold mb-4">Số lượng sản phẩm</h2>
                <ChartContainer config={chartConfig} className="min-h-[300px]" >
                    <BarChart accessibilityLayer data={data}>
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <CartesianGrid vertical={false} />

                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <Bar dataKey="numberOfFinishedOrders" fill="var(--color-numberOfFinishedOrders)" radius={4} />
                        <Bar dataKey="numberOfCancelledOrders" fill="var(--color-numberOfCancelledOrders)" radius={4} />

                    </BarChart>
                </ChartContainer>
            </div>
        </div>


    </div>
}