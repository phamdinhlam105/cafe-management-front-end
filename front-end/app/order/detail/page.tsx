import Header from "@/components/layout-components/header/header";
import OrderDetailBody from "./body";
import { Suspense } from "react";

export default function OrderDetailPage() {

    return <>
        <Header title="Chi tiết đơn hàng" />
        <Suspense fallback={<p>Loading...</p>}>
            <OrderDetailBody />
        </Suspense>

    </>
}