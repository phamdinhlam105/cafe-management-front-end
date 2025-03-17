


export default function BestDay({ bestDay }: { bestDay: { weekDay: string, avgRevenue: number }[] }) {


    const convertToVietnamese = (weekDay: string): string => {
        const daysMap: { [key: string]: string } = {
            "Sunday": "Chủ Nhật",
            "Monday": "Thứ Hai",
            "Tuesday": "Thứ Ba",
            "Wednesday": "Thứ Tư",
            "Thursday": "Thứ Năm",
            "Friday": "Thứ Sáu",
            "Saturday": "Thứ Bảy"
        };

        return daysMap[weekDay] || "Không hợp lệ";
    };

    return <div className="p-4 border rounded shadow-md w-1/3">
        <h3 className="text-xl font-bold mb-4 text-center">Ngày tốt nhất</h3>
        <div className="space-y-10">
        {bestDay ? bestDay.map((bd, idx) =>
            <div key={idx} className="grid grid-cols-[200px,1fr] gap-x-4">
                <div className="font-bold">Ngày báo cáo:</div>
                <div className="text-left">{convertToVietnamese(bd.weekDay)}</div>

                <div className="font-bold">Doanh thu trung bình:</div>
                <div className="text-left">
                    {bd.avgRevenue.toLocaleString()} đ
                </div>
            </div>
        ) : (
            <p>Không có báo cáo nào</p>
        )}
        </div>
      
    </div>
}