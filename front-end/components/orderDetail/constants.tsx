import { OrderStatus, OrderType } from "../order/enums";
import { OrderDetail } from "./orderDetail-model";

export const ORDER_DETAILS: OrderDetail[] = [
    {
        id: "1",
        productName: "Cafe",
        quantity: "1",
        total: "20000",
        note: "ít đá",
        order: {

            id: "1",
            price: "72000",
            quantity: "3",
            note: "ít đá",
            customerName: "",
            orderType: OrderType.Online,
            orderStatus: OrderStatus.New,
            createAt: "24/11/2024 08:00:00",
            details: [],
        }
    },
    {
        id: "2",
        productName: "Sting",
        quantity: "1",
        total: "22000",
        note: "",
        order: {

            id: "1",
            price: "72000",
            quantity: "3",
            note: "ít đá",
            customerName: "",
            orderType: OrderType.Online,
            orderStatus: OrderStatus.New,
            createAt: "24/11/2024 08:00:00",
            details: [],
        }
    },
    {
        id: "3",
        productName: "Trà đào",
        quantity: "1",
        total: "30000",
        note: "",
        order: {

            id: "1",
            price: "72000",
            quantity: "3",
            note: "ít đá",
            customerName: "",
            orderType: OrderType.Online,
            orderStatus: OrderStatus.New,
            createAt: "24/11/2024 08:00:00",
            details: [],
        }
    },
    {
        id: "4",
        productName: "Trà đào",
        quantity: "1",
        total: "30000",
        note: "",
        order: {
            id: "3",
            price: "72000",
            quantity: "3",
            note: "ít đá",
            customerName: "Khách tại quán",
            orderType: OrderType.InStore,
            orderStatus: OrderStatus.Completed,
            createAt: "24/11/2024 08:00:00",
            details: []
        }
    },
    {
        id: "5",
        productName: "Cafe",
        quantity: "1",
        total: "20000",
        note: "ít đá",
        order: {

            id: "2",
            price: "72000",
            quantity: "3",
            note: "ít đá",
            customerName: "",
            orderType: OrderType.Online,
            orderStatus: OrderStatus.New,
            createAt: "24/11/2024 08:00:00",
            details: [],
        }
    },
    {
        id: "6",
        productName: "Sting",
        quantity: "1",
        total: "22000",
        note: "",
        order: {

            id: "2",
            price: "72000",
            quantity: "3",
            note: "ít đá",
            customerName: "",
            orderType: OrderType.Online,
            orderStatus: OrderStatus.New,
            createAt: "24/11/2024 08:00:00",
            details: [],
        }
    },
    {
        id: "7",
        productName: "Trà đào",
        quantity: "1",
        total: "30000",
        note: "",
        order: {

            id: "2",
            price: "72000",
            quantity: "3",
            note: "ít đá",
            customerName: "",
            orderType: OrderType.Online,
            orderStatus: OrderStatus.New,
            createAt: "24/11/2024 08:00:00",
            details: [],
        }
    },
]