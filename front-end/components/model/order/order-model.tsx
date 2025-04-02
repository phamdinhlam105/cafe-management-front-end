import { OrderStatus } from "@/components/helper/enums"
import { OrderDetail } from "./orderDetail-model"

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

