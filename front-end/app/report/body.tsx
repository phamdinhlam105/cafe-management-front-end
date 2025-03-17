"use client"
import { DatePicker } from "@/components/date-picker";
import { formatDate } from "@/components/helper/date-to-string";
import BestDay from "@/components/report/best-day";
import { DailyReport } from "@/components/report/daily/daily-report-model";
import ReportChart from "@/components/report/report-chart";
import { getDailyReportByRange, updateReportService } from "@/components/service/report-service";
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
    const [bestDay, setBestDay] = useState<{ weekDay: string, avgRevenue: number }[]>([]);

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

    const fetchReports = async (startDate: string, endDate: string) => {
        const result = await callWithAuth(() => getDailyReportByRange(startDate, endDate))
        if (!result.error) {
            const sortedReports = result.reports.sort((a: { reportDate: string }, b: { reportDate: string }) => {
                // Chuyển createDate từ chuỗi yyyy/mm/dd thành đối tượng Date
                const dateA = new Date(a.reportDate.split('/').reverse().join('/'));  // Chuyển từ yyyy/mm/dd -> dd/mm/yyyy
                const dateB = new Date(b.reportDate.split('/').reverse().join('/'));  // Chuyển từ yyyy/mm/dd -> dd/mm/yyyy

                // So sánh hai ngày (ascending order)
                return dateA.getTime() - dateB.getTime();
            });

            setData(sortedReports);
            setBestDay(result.bestDays)
        }
        else {
            toast.error("Không thể lấy dữ liệu", { description: `Lỗi ${result.error}` })
        }
    }


    const handleChooseDate = async () => {
        if (!startDate || !endDate) {
            toast.warning("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc.");
            return;
        }

        const today = new Date();
        const formattedStart = formatDate(startDate);
        const formattedEnd = formatDate(endDate);

        if (endDate > today) {
            toast.warning("Ngày kết thúc không được lớn hơn ngày hôm nay.");
            return;
        }

        if (startDate > endDate) {
            toast.warning("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
            return;
        }

        await fetchReports(formattedStart, formattedEnd);
        console.log(bestDay);
    };
    const handleUpdateReport = async () => {
        if (!startDate || !endDate) {
            toast.warning("Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc.");
            return;
        }

        const today = new Date();
        const formattedStart = formatDate(startDate);
        const formattedEnd = formatDate(endDate);

        if (endDate > today) {
            toast.warning("Ngày kết thúc không được lớn hơn ngày hôm nay.");
            return;
        }

        if (startDate > endDate) {
            toast.warning("Ngày bắt đầu không được lớn hơn ngày kết thúc.");
            return;
        }

        // Lặp qua từng ngày trong khoảng thời gian
        const dateRange = [];
        let currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            dateRange.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        // Gọi API cho từng ngày
        const allReports = [];
        const bestDaysData = [];
        for (const date of dateRange) {
            const formattedDate = formatDate(date);

            const result = await callWithAuth(() => updateReportService(formattedDate));
            if (result.error) {
                toast.error(`Không thể lấy dữ liệu cho ngày ${formattedDate}`, { description: `Lỗi ${result.error}` });
                return;
            }
        }
        toast("Cập nhật thành công")

        // Cập nhật báo cáo và best day
        await fetchReports(formattedStart, formattedEnd);
    };

    return <div className="p-4 space-y-5">
        {/*<Label className="mr-4">Loại báo cáo</Label>
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
        </DropdownMenu>*/}
        <div className="flex space-x-2 items-center">
            <Label>Từ ngày</Label>
            <DatePicker date={startDate} setDate={setStartDate} />
            <Label>Đến ngày</Label>
            <DatePicker date={endDate} setDate={setEndDate} />
            <Button onClick={handleChooseDate} variant="outline">Xem báo cáo</Button>
            <Button onClick={handleUpdateReport}>Cập nhật lại báo cáo</Button>
        </div>
        <div className="flex space-x-5">
            {reportData ?
                <>
                    <ReportChart data={data} />
                    <BestDay bestDay={bestDay} /></>
                : "Chưa có báo cáo nào"}
        </div>
    </div>
}