import { Order } from "../order/order-model";

export interface OrderDetail {
    id: string,
    order: Order | undefined,
    productName: string,
    quantity: string,
    total: string,
    note: string | null
}