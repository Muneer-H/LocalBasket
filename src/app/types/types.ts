export type Product = {
    id: string;
    itemName: string;
    category: string;
    price: number;
    image: string;
    rating: number;
    inStock: boolean;
    shortDescription: string;
    detailDescription: string;
    inCart: boolean;
}
export type CartProduct = Product & {
    quantity: number;
}