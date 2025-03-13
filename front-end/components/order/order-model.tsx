import { OrderDetail } from "../orderDetail/orderDetail-model"
import { OrderStatus } from "./enums"

export interface Order {
    id?: string,
    no: number,
    price: string,
    quantity: number,
    note: string,
    customerId?: string,
    orderStatus: OrderStatus,
    createAt: string,
    promotionId?:string,
    details?: OrderDetail[]
}

