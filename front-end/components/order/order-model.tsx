import { OrderDetail } from "../orderDetail/orderDetail-model"
import { OrderStatus } from "./enums"

export interface Order {
    id: string,
    price: string,
    quantity: string,
    note: string,
    customerName: string,
    orderStatus: OrderStatus,
    createAt: string,
    details: OrderDetail[]
}

