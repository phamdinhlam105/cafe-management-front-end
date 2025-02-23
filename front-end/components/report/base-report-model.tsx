
export interface BaseReport{
    id:string;
    totalRevenue:string;
    totalExpenditure:string;
    topSelling: Product;
    leastSelling: Product;
    numberOfFinishedOrders:Number;
    numberOfCancelledOrders:Number;
    totalProductsSold:Number;
    createDate:string;
}