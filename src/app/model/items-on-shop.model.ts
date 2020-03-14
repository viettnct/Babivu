import { WholeSales } from "./wholesales.model";

export class ItemsOnShop {
    cartId: number = 0;
    itemId: number = 0;
    lCartItemId: number = 0;
    itemName: string = "";
    itemImage: string = "";
    saleLocation: string = "";
    itemLink: string = "";
    itemPrice: string = "";
    itemPriceNdt: string = "";
    requireMin: string = "";
    propetiesType: string = "";
    propetiesName: string = "";
    propetiesImage: string = "";
    wholesales: WholeSales[] = new Array<WholeSales>();
    wholesalesJson: WholeSales[] = new Array<WholeSales>();
    quantity: number = 0;
    stock: string = "";
    updateView: string = "";
    description: string = "";
}