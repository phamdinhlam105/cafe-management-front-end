import { OrderStatus, OrderType } from "./enums";
import { Order } from "./order-model";

export const ORDER: Order[] = [
    {
        id:"1",
        price:"72000",
        quantity:"3",
        note:"ít đá",
        customerName:"Phạm Đình Lâm",
        orderType: OrderType.Online,
        orderStatus:OrderStatus.New,
        createAt:"24/11/2024 08:00:00",
        details:[
            {
                id:"1",
                productName:"Cafe",
                quantity:"1",
                total:"20000",
                note:""
            },
            {
                id:"2",
                productName:"Sting",
                quantity:"1",
                total:"22000",
                note:""
            },
            {
                id:"3",
                productName:"Trà đào",
                quantity:"1",
                total:"30000",
                note:""
            }
        ]
    },
    {
        id:"2",
        price:"72000",
        quantity:"3",
        note:"ít đá",
        customerName:"Phạm Đình Lâm",
        orderType: OrderType.Online,
        orderStatus:OrderStatus.Confirmed,
        createAt:"24/11/2024 08:00:00",
        details:[
            {
                id:"1",
                productName:"Cafe",
                quantity:"1",
                total:"20000",
                note:""
            },
            {
                id:"2",
                productName:"Sting",
                quantity:"1",
                total:"22000",
                note:""
            },
            {
                id:"3",
                productName:"Trà đào",
                quantity:"1",
                total:"30000",
                note:""
            }
        ]
    },
    {
        id:"3",
        price:"72000",
        quantity:"3",
        note:"ít đá",
        customerName:"Khách tại quán",
        orderType: OrderType.InStore,
        orderStatus:OrderStatus.Completed,
        createAt:"24/11/2024 08:00:00",
        details:[
            {
                id: "4",
                productName: "Trà đào",
                quantity: "1",
                total: "30000",
                note: ""
            }
        ]
    }
]