import { DailyReport } from "./daily-report-model";

export default function BestDay({ bestDay }: { bestDay: DailyReport | null | undefined }) {

    return <div className="p-4 border rounded shadow-md w-1/3">
        <h3 className="text-xl font-bold mb-4 text-center">Ngày tốt nhất</h3>
        {bestDay ? (
            <div className="grid grid-cols-[200px,1fr] gap-x-4">
                <div className="font-bold">Ngày báo cáo:</div>
                <div className="text-left">{bestDay.reportDate}</div>

                <div className="font-bold">Doanh thu:</div>
                <div className="text-left">
                    {Number(bestDay.totalRevenue).toLocaleString()} đ
                </div>

                <div className="font-bold">Chi phí:</div>
                <div className="text-left">
                    {Number(bestDay.totalExpenditure).toLocaleString()} đ
                </div>

                <div className="font-bold">Lợi nhuận:</div>
                <div className="text-left">
                    {(Number(bestDay.totalRevenue) - Number(bestDay.totalExpenditure)).toLocaleString()} đ
                </div>

                <div className="font-bold">Số đơn hoàn thành:</div>
                <div className="text-left">{bestDay.numberOfFinishedOrders.toString()}</div>

                <div className="font-bold">Số sản phẩm đã bán:</div>
                <div className="text-left">{bestDay.totalProductsSold.toString()}</div>

                <div className="font-bold">Giờ cao điểm:</div>
                <div className="text-left">{bestDay.peakHours.map(ph => `${ph}h`).join(", ")}</div>
            </div>
        ) : (
            <p>Không có báo cáo nào</p>
        )}
    </div>
}