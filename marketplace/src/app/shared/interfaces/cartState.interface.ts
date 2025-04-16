import { CartItem } from "./cartItem.interface";

export interface Order {
    quantity: number;
    date: Date;
    state: string;
    documentId: string;
    price: number;
}

export interface CartState {
    cartItems: CartItem[];
    order: Order | null;
}