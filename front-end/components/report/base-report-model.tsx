
export interface BaseReport{
    id:string;
    totalRevenue:string;
    totalExpenditure:string;
    topSelling: Product;
    topSellingId:string;
    leastSelling: Product;
    leastSellingId:string;
    numberOfFinishedOrders:Number;
    numberOfCancelledOrders:Number;
    totalProductsSold:Number;
    createDate:string;
}