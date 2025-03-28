import { Product } from "./product.interface";

export interface CartItem extends Product{
    documentId: string;
    quantity: number;
}