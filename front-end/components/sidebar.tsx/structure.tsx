import { House, Wine, ShoppingCart, List, Layers, Newspaper, Gift, SquareUser } from "lucide-react";

export const SidebarStructure = [
    
    {
        title: "Trang chủ",
        url: "/",
        icon: House,
    },
    {
        title: "Khách hàng",
        url: "/customer",
        icon: SquareUser,
        
    },
    {
        title: "Đơn hàng",
        url: "/order",
        icon: ShoppingCart,
        items: [
            {
                title: "Toàn bộ chi tiết",
                url: "/order/all-detail",
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
                url: "/stock/import",
            },
            {
                title: "Cập nhật kho",
                url: "#",
            },
            {
                title: "Nguyên liệu",
                url: "/ingredient",
            },
        ],
    },
    {
        title: "Khuyến mãi",
        url: "/promotion",
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
        url: "/report",
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