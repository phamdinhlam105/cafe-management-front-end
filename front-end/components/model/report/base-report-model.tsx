
export interface BaseReport{
    id:string;
    totalRevenue:string;
    totalExpenditure:string;
    topSellingId:string;
    leastSellingId:string;
    numberOfFinishedOrders:Number;
    numberOfCancelledOrders:Number;
    totalProductsSold:Number;
    createDate:string;
}