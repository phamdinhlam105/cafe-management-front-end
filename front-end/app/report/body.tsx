"use client"
import { DatePicker } from "@/components/date-picker";
import BestDay from "@/components/report/best-day";
import { DAILY_REPORTS } from "@/components/report/daily-report-constants";
import { DailyReport } from "@/components/report/daily-report-model";
import ReportChart from "@/components/report/report-chart";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";

export default function ReportBody() {
    const [data, setData] = useState<DailyReport[]>(DAILY_REPORTS);
    const [reportData, setReportData] = useState<DailyReport[]>(data);
    const [startDate, setStartDate] = useState<Date>(new Date);
    const [endDate, setEndDate] = useState<Date>(new Date);
    const [bestDay, setBestDay] = useState<DailyReport | null>();
    const parseDate = (dateStr: string): Date => {
        const [day, month, year] = dateStr.split("/").map(Number);
        return new Date(year, month - 1, day);
    };

    const normalizeDate = (date: Date): Date => {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
      };

    const calculateProfit = (report: DailyReport): number => {
        const revenue = Number(report.totalRevenue);
        const expenditure = Number(report.totalExpenditure);
        return revenue - expenditure;
    };

    const handleChooseDate = () => {
        const normalizedStart = normalizeDate(startDate);
        const normalizedEnd = normalizeDate(endDate);

        const filtered = data.filter(report => {
            const reportDate = parseDate(report.reportDate);
            return reportDate >= normalizedStart && reportDate <= normalizedEnd;
        });
        setReportData(filtered);
        if (filtered.length > 0) {
            const best = filtered.reduce((prev, curr) => {
                return calculateProfit(curr) > calculateProfit(prev) ? curr : prev;
            });
            setBestDay(best);
        } else {
            setBestDay(null);
        }
    };
    return <div className="p-4 space-y-5">
        <div className="flex space-x-2 items-center">
            <Label>Từ ngày</Label>
            <DatePicker date={startDate} setDate={setStartDate} />
            <Label>Đến ngày</Label>
            <DatePicker date={endDate} setDate={setEndDate} />
            <Button onClick={handleChooseDate} variant="outline">Xem báo cáo</Button>
        </div>
        <div className="flex space-x-5">
            <ReportChart data={reportData} />
            <BestDay bestDay={bestDay}/>
        </div>
    </div>
}