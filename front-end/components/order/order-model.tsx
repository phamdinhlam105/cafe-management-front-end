import { OrderDetail } from "../orderDetail/orderDetail-model"
import { OrderStatus } from "./enums"

export interface Order {
    id: string,
    no: number,
    total: string,
    amount: number,
    note: string,
    customerName?:string,
    customerId?: string,
    status: OrderStatus,
    createdAt: string,
    promotionId?:string,
    details?: OrderDetail[]
}

