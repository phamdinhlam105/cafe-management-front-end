import { DailyReport } from "./daily/daily-report-model";

export default function BestDay({ bestDay }: { bestDay: {weekDay:string,avgRevenue:string} }) {

    return <div className="p-4 border rounded shadow-md w-1/3">
        <h3 className="text-xl font-bold mb-4 text-center">Ngày tốt nhất</h3>
        {bestDay ? (
            <div className="grid grid-cols-[200px,1fr] gap-x-4">
                <div className="font-bold">Ngày báo cáo:</div>
                <div className="text-left">{bestDay.weekDay}</div>

                <div className="font-bold">Doanh thu:</div>
                <div className="text-left">
                    {Number(bestDay.avgRevenue).toLocaleString()} đ
                </div>
            </div>
        ) : (
            <p>Không có báo cáo nào</p>
        )}
    </div>
}