import { OrderDetail } from "../orderDetail/orderDetail-model"
import { OrderStatus, OrderType } from "./enums"

export interface Order {
    id: string,
    price: string,
    quantity: string,
    note: string,
    customerName: string,
    orderType: OrderType,
    orderStatus: OrderStatus,
    createAt: string,
    details: OrderDetail[]
}

