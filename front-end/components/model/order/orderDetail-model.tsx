import { Order } from "../order/order-model";

export interface OrderDetail {
    id: string,
    orderId?: string,
    productName: string,
    quantity: string,
    total: string,
    note: string | null
}