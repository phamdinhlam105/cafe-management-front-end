import { OrderDetail } from "../orderDetail/orderDetail-model"
import { OrderStatus } from "./enums"

export interface Order {
    id: string,
    total: string,
    quantity: string,
    note: string,
    customerId?: string,
    orderStatus: OrderStatus,
    createAt: string,
    promotionId?:string,
    details: OrderDetail[]
}

