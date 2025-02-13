import {Settings, House, Wine, ShoppingCart, List, Layers, Newspaper, Gift } from "lucide-react";

export const SidebarStructure = [
    
    {
        title: "Trang chủ",
        url: "/",
        icon: House,
    },
    {
        title: "Đơn hàng",
        url: "/order",
        icon: ShoppingCart,
        items: [
            {
                title: "Toàn bộ chi tiết",
                url: "#",
            },
            {
                title:"Đơn hàng mới",
                url:"/new-order"
            }
        ],
    },
    {
        title: "Sản phẩm",
        url: "/product",
        icon: Wine,
    },
  
    {
        title: "Danh mục",
        url: "/category",
        icon: List
    },
    {
        title: "Kho hàng",
        url: "/stock",
        icon: Layers,
        items: [
            {
                title: "Nhập kho",
                url: "#",
            },
            {
                title: "Tồn kho",
                url: "#",
            },
        ],
    },
    {
        title: "Khuyến mãi",
        url: "#",
        icon: Gift,
        items: [
            {
                title: "Tạo mới",
                url: "#",
            },
            {
                title: "Chỉnh sửa",
                url: "#",
            },
        ],
    },
    {
        title: "Báo cáo",
        url: "#",
        icon: Newspaper,
        items: [
            {
                title: "Ngày hôm nay",
                url: "#",
            },
            {
                title: "Nhiều ngày",
                url: "#",
            },
        ],
    },
]