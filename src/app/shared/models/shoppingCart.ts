import { ShoppingCartItem } from './shoppingCartItem';

export class ShoppingCart {

    itemsArr: ShoppingCartItem[] = [];
    constructor(private itemsMap: { [size: string]: { [productId: string]: ShoppingCartItem} }) {
        this.itemsMap = itemsMap || {};
        // tslint:disable-next-line:forin
        for (let size in itemsMap) {
            let sizeObj = itemsMap[size];
            // tslint:disable-next-line:forin
            for (let productId in sizeObj) {
                let item = sizeObj[productId];
                this.itemsArr.push(new ShoppingCartItem({ ...item, $key: productId }));
            }
        }
    }

    getQuantity(product: any) {

        let item = this.itemsMap[product.size][product.$key];
        return item ? item.quantity : 0;
    }

    get totalItemsCount() {
        let count = 0;
        // tslint:disable-next-line:forin
        for (let size in this.itemsMap) {
            // tslint:disable-next-line:forin
            for (let productId in this.itemsMap[size]) {
                count += this.itemsMap[size][productId].quantity;
            }
        }
        return count;
    }

    get totalPrice() {
        let sum = 0;
        // tslint:disable-next-line:forin
        for (let productId in this.itemsArr) {
            sum += this.itemsArr[productId].totalPrice;
        }

        return sum;
    }
}
