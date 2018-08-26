import { ShoppingCart } from './shoppingCart';
export class Order {
    datePlaced: number;
    items: any[];
    totalPrice: number;

    constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
        this.datePlaced = new Date().getTime();

        this.items = shoppingCart.itemsArr.map(i => {
            return {
                product: {
                    brand: i.brand,
                    title: i.title,
                    price: i.price,
                    coverUrl: i.coverUrl
                },
                quantity: i.quantity,
                totalPrice: i.totalPrice
            };
        });
        this.totalPrice = shoppingCart.totalPrice;
    }
}
