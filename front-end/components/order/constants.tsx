import { OrderStatus } from "./enums";
import { Order } from "./order-model";

export const ORDER: Order[] = [
    {
        id: "1",
        price: "72000",
        quantity: "3",
        note: "ít đá",
        customerName: "Phạm Đình Lâm",
        orderStatus: OrderStatus.New,
        createAt: "24/11/2024 08:00:00",
        details: [
            {
                id: "1",
                productName: "Cafe",
                quantity: "1",
                total: "20000",
                note: "",
                orderId: "1"
            },
            {
                id: "2",
                productName: "Sting",
                quantity: "1",
                total: "22000",
                note: "",
                orderId: "1"
            },
            {
                id: "3",
                productName: "Trà đào",
                quantity: "1",
                total: "30000",
                note: "",
                orderId: "1"
            }
        ]
    },
    {
        id: "2",
        price: "72000",
        quantity: "3",
        note: "ít đá",
        customerName: "Phạm Đình Lâm",
        orderStatus: OrderStatus.Completed,
        createAt: "24/11/2024 08:00:00",
        details: [
            {
                id: "1",
                productName: "Cafe",
                quantity: "1",
                total: "20000",
                note: "",
                orderId: "2"
            },
            {
                id: "2",
                productName: "Sting",
                quantity: "1",
                total: "22000",
                note: "",
                orderId: "2"
            },
            {
                id: "3",
                productName: "Trà đào",
                quantity: "1",
                total: "30000",
                note: "",
                orderId: "2"
            }
        ]
    },
    {
        id: "3",
        price: "72000",
        quantity: "3",
        note: "ít đá",
        customerName: "Khách tại quán",
        orderStatus: OrderStatus.Completed,
        createAt: "24/11/2024 08:00:00",
        details: [
            {
                id: "4",
                productName: "Trà đào",
                quantity: "1",
                total: "30000",
                note: "",
                orderId: "3"
            }
        ]
    }
]