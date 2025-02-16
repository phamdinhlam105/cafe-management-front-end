import { Button } from "../ui/button";

export default function OrderStatusButton({status}:{status:string|undefined}){

    return <div className="flex items-center space-x-2">
        <p>Trạng thái đơn hàng: </p>
        <Button variant="outline" className="text-xl">
            {status}
        </Button>
    </div>
}