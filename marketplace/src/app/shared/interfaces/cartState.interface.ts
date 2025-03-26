import { CartItem } from "./cartItem.interface";

export interface Order {
    quantity: number;
    date: Date;
    state: string;
    documentId: string;
}

export interface CartState {
    cartItems: CartItem[];
    order: Order | null;
}