"use client"
import { DatePicker } from "@/components/date-picker";
import BestDay from "@/components/report/best-day";
import { DAILY_REPORTS } from "@/components/report/daily/daily-report-constants";
import { DailyReport } from "@/components/report/daily/daily-report-model";
import ReportChart from "@/components/report/report-chart";
import { getDailyReportByRange } from "@/components/service/report-service";
import { callWithAuth } from "@/components/service/token-handler";
import { Button } from "@/components/ui/button";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ReportBody() {
    const [data, setData] = useState<DailyReport[]>([]);
    const [reportData, setReportData] = useState<DailyReport[]>(data);
    const [startDate, setStartDate] = useState<Date>(new Date);
    const [endDate, setEndDate] = useState<Date>(new Date);
    const [bestDay, setBestDay] = useState<{weekDay:string,avgRevenue:string}>({
        weekDay:"",
        avgRevenue:"0"
    });
    const [reportType, setReportType] = useState("Báo cáo ngày");

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

    const fetchReports = async () => {
        const result = await callWithAuth(await getDailyReportByRange(startDate, endDate))
        if (!result.error) {
            setData(result.reports);
            setBestDay(result.bestDays)
        }
        else {
            toast.error("Không thể lấy dữ liệu")
        }
    }


    const handleChooseDate = async () => {
        if (!startDate || !endDate) {
            toast.warning("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc.");
            return;
        }

        const today = normalizeDate(new Date());
        const normalizedStart = normalizeDate(startDate);
        const normalizedEnd = normalizeDate(endDate);

        if (normalizedEnd > today) {
            toast.warning("Ngày kết thúc không được lớn hơn ngày hôm nay.");
            return;
        }

        if (normalizedStart > normalizedEnd) {
            toast.warning("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
            return;
        }

        await fetchReports();
    };

    return <div className="p-4 space-y-5">
        <Label className="mr-4">Loại báo cáo</Label>
        <DropdownMenu>
            <DropdownMenuTrigger className="border rounded-sm p-2 w-48">{reportType}</DropdownMenuTrigger>
            <DropdownMenuContent className="border rounded-sm shadow-md bg-neutral-50 w-48">
                <DropdownMenuItem>
                    <Button variant="ghost" onClick={() => setReportType("Báo cáo ngày")}>Báo cáo ngày</Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button variant="ghost" onClick={() => setReportType("Báo cáo tháng")}>Báo cáo tháng</Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Button variant="ghost" onClick={() => setReportType("Báo cáo quý")}>Báo cáo quý</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex space-x-2 items-center">
            <Label>Từ ngày</Label>
            <DatePicker date={startDate} setDate={setStartDate} />
            <Label>Đến ngày</Label>
            <DatePicker date={endDate} setDate={setEndDate} />
            <Button onClick={handleChooseDate} variant="outline">Xem báo cáo</Button>
        </div>
        <div className="flex space-x-5">
            {reportData ?
                <>
                    <ReportChart data={reportData} />
                    <BestDay bestDay={bestDay} /></>
                : "Chưa có báo cáo nào"}
        </div>
    </div>
}