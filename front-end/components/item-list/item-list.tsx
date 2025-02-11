import { CircleX, ReceiptText } from "lucide-react"
import { OrderStatus, OrderType } from "../order/enums"
import { Order } from "../order/order-model"
import Link from "next/link"

export default function ItemList({ data }: { data: Order[] }) {
    return (
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 shadow-sm ">
            {data.length === 0 &&<><div></div><h2 className="text-2xl font-bold mx-auto text-red-600">Không có dữ liệu nào</h2></>}
            {data.map(item => {
                return <li key={item.id} className="col-span-1 divide-y divide-gray-200 rounded-lg bg-gray-50 shadow hover:shadow-lg hover:scale-105 transition-transform duration-200">
                    <div className="flex w-full items-center justify-between space-x-6 p-6">
                        <div className="flex-1 truncate">
                            <div className="flex items-center justify-between space-x-3">
                                <h3 className={`truncate text-md font-semibold ${(() => {
                                    switch (item.orderStatus) {
                                        case OrderStatus.New:
                                            return 'text-green-800';
                                        case OrderStatus.Confirmed:
                                            return 'text-yellow-700';
                                        case OrderStatus.Completed:
                                            return 'text-blue-500';
                                        case OrderStatus.Cancelled:
                                            return 'text-red-300';
                                        default:
                                            return '';
                                    }
                                })()}`}>{OrderStatus[item.orderStatus]} Order</h3>
                                <span className={`inline-flex flex-shrink-0 items-center rounded-full bg-green-50 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ring-green-600/20 
                                ${item.orderType === OrderType.Online ?
                                        'text-blue-600' :
                                        'text-yellow-600'}`}>{item.orderType === OrderType.Online ? "Online Order" : "Instore Order"}</span>
                            </div>
                            <span className="mt-1 truncate text-sm text-gray-500">
                                Khách hàng:{' '}
                            </span>
                            <p className="truncate text-sm font-bold">
                                {item.customerName}
                            </p>
                            <span className="mt-1 truncate text-sm text-gray-500">
                                Thời gian:{' '}
                            </span>
                            <p className="truncate text-sm">
                                {item.createAt}
                            </p>
                            <p className="mt-1 truncate text-md">
                                <span className="text-gray-500">
                                    Số lượng:{' '}
                                </span>
                                {item.quantity}</p>
                            <p className="mt-1 truncate text-md ">
                                <span className="text-gray-500">
                                    Tổng tiền:{' '}
                                </span>
                                {item.price}
                            </p>
                            {item.note && <p className="mt-1 truncate text-md ">
                                <span className="text-gray-500">
                                    Ghi chú:{' '}
                                </span>
                                {item.note}
                            </p>}
                        </div>
                    </div>
                    <div>
                        <div className="-mt-px flex divide-x divide-gray-200">
                            <div className="flex w-0 flex-1">
                                <Link href={`/order/${item.id}`} className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900">
                                    <ReceiptText />
                                    Chi tiết
                                </Link>
                            </div>
                            <div className="-ml-px flex w-0 flex-1">
                                <Link href="#" className=" relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-red-600">
                                    <CircleX />
                                    Hủy đơn
                                </Link>
                            </div>
                        </div>
                    </div>
                </li>

            })}

        </ul>
    )

}